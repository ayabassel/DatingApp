namespace DatingApp.API.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }
    }
}