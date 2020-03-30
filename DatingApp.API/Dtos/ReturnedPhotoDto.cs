using System;

namespace DatingApp.API.Data
{
    public class ReturnedPhotoDto
    {       
        public int ID { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        
        
    }
}