using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helper;
using DatingApp.API.Model;

namespace DatingApp.API.Data
{
    public interface IDatingAppRepo
    {
         void Add<T>(T entity) where T: class;

         void Remove<T>(T entity) where T: class;

         Task<User> GetUser(int id);

         Task<PageList<User>> GetUsers(UserPrams prams);

         Task<bool> SaveAll();

         Task<Photos> GetPhoto(int photoId);

         Task<Like> GetLike(int userId, int recipientId);

         Task<Message> GetMessage(int messageId);
         Task<PageList<Message>> GetUserMessages();
         Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);

         
    }
}