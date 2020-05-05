using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helper;
using DatingApp.API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        
        private readonly IDatingAppRepo _repo;
        private readonly IMapper _mapper;        
        public UsersController(IDatingAppRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> getUsers([FromQuery]UserPrams prams)
        {
            prams.Id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(prams.Id);

            if(string.IsNullOrEmpty(prams.Gender)) {
                
                prams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }
           
            var users = await _repo.GetUsers(prams);
            var usersForReturn = _mapper.Map<IEnumerable<UsersForListDto>>(users);
            Response.AddPagination(users.TotalCount, users.TotalPages, users.PageSize, users.CurrentPage);
            return Ok(usersForReturn);
        }

        [HttpGet("{id}", Name="getUser")]
        public async Task<IActionResult> getUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userForReturn = _mapper.Map<UserForDetailsDto>(user);
            return Ok(userForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateUser(int id, UserUpdateDto userUpdateDto) {

            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(id);
            _mapper.Map(userUpdateDto, userFromRepo);
            if( await _repo.SaveAll()) {
                return NoContent();
            }

            throw new Exception($"updating user {id} failed on save!");

        }

    }
}