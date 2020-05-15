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
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{

    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Microsoft.AspNetCore.Mvc.Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IDatingAppRepo _repo;
        private readonly IMapper _mapper;
        public MessagesController(IDatingAppRepo repo, IMapper mapper)
        {
            this._mapper = mapper;
            this._repo = repo;

        }


        [HttpGet("{id}", Name = "getMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var message =  await _repo.GetMessage(id);

            if (message == null)
            return NotFound();

            return Ok(message);


        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDTo messageForCreationDTo) {

             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();          
            }

            var recipient = await _repo.GetUser(messageForCreationDTo.RecipientId);
            var sender = await _repo.GetUser(userId);
            messageForCreationDTo.UserId = userId;

            if (await _repo.GetUser(messageForCreationDTo.RecipientId) == null) {
                return BadRequest("Couldn't Find User!");
            }

            var message = _mapper.Map<Message>(messageForCreationDTo);

            _repo.Add<Message>(message);


            if (await _repo.SaveAll()) {
                var messageForReturn = _mapper.Map<MessageToReturnDto>(message);
                return CreatedAtRoute("getMessage", new { userId, id = message.Id}, messageForReturn);
            }
            
            return BadRequest("Failure in message sending!");

        }

        [HttpGet] 
        public async Task<IActionResult> GetUserMessages(int userId, [FromQuery]MessageParam messageParam) {

             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();          
            }

            messageParam.UserId = userId;

            var messages = await _repo.GetUserMessages(messageParam);
            var messageForReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messages);
           

           Response.AddPagination(messages.TotalCount, messages.TotalPages, messages.PageSize, messages.CurrentPage);

            return Ok(messageForReturn);
   
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetChatMessages(int userId, int recipientId) {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();          
            }

            var messages = await _repo.GetMessageThread(userId,recipientId);

            var messageForReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messages);
            return Ok(messageForReturn);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int userId, int id) {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();          
            }

            var messageFromRepo = await _repo.GetMessage(id);

            if(messageFromRepo.RecipientId == userId)
            messageFromRepo.RecipientDelete = true;

            if(messageFromRepo.SenderId == userId)
            messageFromRepo.SenderDelete = true;

            if(messageFromRepo.SenderDelete && messageFromRepo.RecipientDelete)
            _repo.Remove(messageFromRepo);

            if( await _repo.SaveAll())
            return NoContent();

            return BadRequest("Error occurred during deleting the message");
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id, int userId) {
             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();          
            }

            var message = await _repo.GetMessage(id);

            if(message.RecipientId != userId)
            return Unauthorized();

            message.IsRead = true;
            message.MessageRead = DateTime.Now;

            await _repo.SaveAll();

            return NoContent();
        }

    }
}