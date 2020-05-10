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

            messageForCreationDTo.UserId = userId;

            if (await _repo.GetUser(messageForCreationDTo.RecipientId) == null) {
                return BadRequest("Couldn't Find User!");
            }

            var message = _mapper.Map<Message>(messageForCreationDTo);

            _repo.Add<Message>(message);

            var messageForReturn = _mapper.Map<MessageForCreationDTo>(message);

            if (await _repo.SaveAll()) {
                return CreatedAtRoute("getMessage", new { userId, id = message.Id}, messageForReturn);
            }
            
            return BadRequest("Failure in message sending!");

        }

    }
}