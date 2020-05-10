using System;

namespace DatingApp.API.Model
{
    public class Message
    {
        public int Id { get; set; }   
        public int SenderId { get; set; }
        public User Sender { get; set; }
        public int RecipientId { get; set; }
        public User Recpient { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? MessageRead { get; set; }
        public DateTime MessageSentTime { get; set; }
        public bool SenderDelete { get; set; }
        public bool RecipientDelete { get; set; }
    }
}