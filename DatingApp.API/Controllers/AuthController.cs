using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _IConfigure;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration IConfigure, IMapper mapper)
        {
            _IConfigure = IConfigure;
            _mapper = mapper;
            _repo = repo;
        }
        [AllowAnonymous] 
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.username = userForRegisterDto.username.ToLower();
            if (await _repo.UserExists(userForRegisterDto.username))
                return BadRequest("The Username is already exists");

            var user = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(user, userForRegisterDto.password);

            var detailedUser = _mapper.Map<UserForDetailsDto>(createdUser);

            return CreatedAtRoute("getUser", new{Controller = "Users", id = createdUser.Id}, createdUser);

        }

        [AllowAnonymous] 
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            //throw new System.Exception("The computer says NO!");
            
            var userFromRepo = await _repo.Login(userForLoginDto.username.ToLower(), userForLoginDto.password);
            var user = _mapper.Map<UsersForListDto>(userFromRepo);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_IConfigure.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor{

                Subject= new ClaimsIdentity(claims),
                Expires= System.DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };

            var tokenHandler= new JwtSecurityTokenHandler();

            var token= tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new{
                token= tokenHandler.WriteToken(token),
                user
                
            });

        }


    }
}