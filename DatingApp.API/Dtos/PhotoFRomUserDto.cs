using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class PhotoFRomUserDto
    {
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public string PublicId { get; set; }
        public DateTime AddedAt { get; set; }
        public string Url { get; set; }
        
    }
}