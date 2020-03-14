using System.Collections.Generic;
using DatingApp.API.Model;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class    seed
    {
        public static void seedUsers(DataContext context)
        {
            var usersData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(usersData);
            foreach(var user in users)
            {
                byte[] passwordHash, passwordSalt;
                createPasswordHash("password", out passwordHash, out passwordSalt);
                user.passwordHash = passwordHash;
                user.passwordSalt = passwordSalt;

                user.Username = user.Username.ToLower();

                context.Users.Add(user);
            }

            context.SaveChanges();

        }

           public static void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac= new System.Security.Cryptography.HMACSHA512())
            {
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                passwordSalt = hmac.Key;

            }
           
        }
    }
}