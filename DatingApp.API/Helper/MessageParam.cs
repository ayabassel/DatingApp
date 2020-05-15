namespace DatingApp.API.Helper
{
    public class MessageParam
    {
        private const int MaxSize = 50 ;
        public int PageNumber { get; set; } = 1 ;
        private int PageSize = 10;
        public int pageSize
        {
            get { return PageSize; }
            set { PageSize = (value > MaxSize) ? MaxSize : value; }
        }

        public int UserId { get; set; }
        public string Content { get; set; }
        public string MessageState { get; set; } = "Unread";
    }
}