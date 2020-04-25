using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helper;
using DatingApp.API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Route("api/users/{userId}/photos")]
    [Authorize]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingAppRepo _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IDatingAppRepo repo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            
             _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int photoId)
        {
            var photoFRomRepo = await _repo.GetPhoto(photoId);
            var photo = _mapper.Map<ReturnedPhotoDto>(photoFRomRepo);
            return Ok(photo);
        }



        [HttpPost]
        public async Task<IActionResult> photoUpload(int userId, [FromForm]PhotoFRomUserDto photoFRomUserDto ) {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(userId);

            var file =  photoFRomUserDto.File;
            var result = new ImageUploadResult();
           

            if(file.Length > 0)
            {
                using (var fileStream = file.OpenReadStream())
                {
                   var uploadParams = new ImageUploadParams() {

                       File = new FileDescription(file.Name, fileStream),
                       Transformation = new Transformation().Width(100).Height(100).Crop("fill").Gravity("face")
                   
                   };
                  

                   result  = _cloudinary.Upload(uploadParams);
                   
                   
                } 
                
            }


                photoFRomUserDto.Url = result.Uri.ToString();    
                photoFRomUserDto.PublicId = result.PublicId;

                var photo = _mapper.Map<Photos>(photoFRomUserDto);

                if(!userFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

                userFromRepo.Photos.Add(photo);

                if(await _repo.SaveAll()) {
                    var returedPhoto = _mapper.Map<ReturnedPhotoDto>(photo);
                    return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.ID }, returedPhoto );
                    
                }
            return BadRequest("Couldn't Upload the photo");
        }

        [HttpPost("{photoId}/setMain")]
        public async Task<IActionResult> MakeItMain(int userId, int photoId) {

            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(userId);

            if(!userFromRepo.Photos.Any(p => p.ID == photoId))
            return Unauthorized();

            var photo = await _repo.GetPhoto(photoId);
            if(photo.IsMain)
            return BadRequest("The photo is already the main");

             var theMainPhoto = userFromRepo.Photos.FirstOrDefault(p => p.IsMain);
            theMainPhoto.IsMain = false;

             photo.IsMain = true;

         
            if( await _repo.SaveAll()) {
                return NoContent();
            }

            return BadRequest("Error during setting the main photo");


                            

        }

        [HttpDelete("{photoId}")]
        public async Task<IActionResult> deletePhoto(int userId, int photoId) {

             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }
            
            var userFromRepo = await _repo.GetUser(userId);

            if(!userFromRepo.Photos.Any(p => p.ID == photoId))
            return Unauthorized();

            var photo = await _repo.GetPhoto(photoId);

            if(photo.IsMain)
            return BadRequest("It's can not be deleted. The photo is the main photo!");

            if(photo.PublicId != null) {

                 var deletePram = new DeletionParams(photo.PublicId);
                 var result = _cloudinary.Destroy(deletePram);

                 if(result.Result == "ok")
                 _repo.Remove(photo);

            }

            _repo.Remove(photo);

             if(await _repo.SaveAll()) 
             {
                 return NoContent();
             }

             return BadRequest("Error at deleting the photo");




        }




    }
}