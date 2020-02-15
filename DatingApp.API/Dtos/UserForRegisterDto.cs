using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string username { get; set; }

        [Required]
        [StringLength(8, MinimumLength=4, ErrorMessage="You must specify the password between 4 and 8")]
        public string password { get; set; }
    }
}