using System;

namespace DatingApp.API.Model
{
    public class Photos
    {
       
        public int ID { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public User users { get; set; }
        public int UserId { get; set; }
    }
}