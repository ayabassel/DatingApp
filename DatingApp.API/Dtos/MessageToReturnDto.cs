using System;

namespace DatingApp.API.Dtos
{
    public class MessageToReturnDto
    {
        public int Id { get; set; }   
        public int SenderId { get; set; }
        public string SenderKnownAs { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int RecipientId { get; set; }
        public string RecpientKnownAs { get; set; }
        public string RecpientPhotoUrl { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? MessageRead { get; set; }
        public DateTime MessageSentTime { get; set; }
    }
}