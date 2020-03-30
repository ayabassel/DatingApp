using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Model;

namespace DatingApp.API.Data
{
    public interface IDatingAppRepo
    {
         void Add<T>(T entity) where T: class;

         void Remove<T>(T entity) where T: class;

         Task<User> GetUser(int id);

         Task<IEnumerable<User>> GetUsers();

         Task<bool> SaveAll();

         Task<Photos> GetPhoto(int photoId);

         
    }
}