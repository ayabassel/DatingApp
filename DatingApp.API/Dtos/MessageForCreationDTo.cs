using System;

namespace DatingApp.API.Dtos
{
    public class MessageForCreationDTo
    {
        public int UserId { get; set; }
        public int RecipientId { get; set; }
        public DateTime Time { get; set; }
        public string Content { get; set; }

        public MessageForCreationDTo()
        {
            Time = DateTime.Now;
        }

    }
}