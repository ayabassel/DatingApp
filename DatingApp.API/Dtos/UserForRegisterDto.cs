using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string gender { get; set; }
        [Required]
        public string username { get; set; }

        [Required]
        public string knownAs { get; set; }

        [Required]
        public DateTime dateOfBirth { get; set; }

        [Required]
        public string country { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        [StringLength(8, MinimumLength=4, ErrorMessage="You must specify the password between 4 and 8")]
        public string password { get; set; }

        public DateTime created { get; set; }

        
        public DateTime lastActive { get; set; }
        public UserForRegisterDto()
        {
            created = DateTime.Now;
            lastActive = DateTime.Now;
        }

    }
}