namespace DatingApp.API.Helper
{
    public class UserPrams
    {
        private const int MaxSize = 50 ;
        public int PageNumber { get; set; } = 1 ;
        private int PageSize = 10;
        public int pageSize
        {
            get { return PageSize; }
            set { PageSize = (value > MaxSize) ? MaxSize : value; }
        }

        public int Id { get; set; }
        public string Gender { get; set; }
        public int MaxAge { get; set; } = 99;
        public int MinAge { get; set; } = 18;
        public string OrderBy { get; set; }
        public bool Liker { get; set; } = false;
        public bool Likee { get; set; } = false;
        
    }
}