using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
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
        public async Task<IActionResult> getUsers()
        {
            var users = await _repo.GetUsers();
            var usersForReturn = _mapper.Map<IEnumerable<UsersForListDto>>(users);
            return Ok(usersForReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userForReturn = _mapper.Map<UserForDetailsDto>(user);
            return Ok(userForReturn);
        }

    }
}