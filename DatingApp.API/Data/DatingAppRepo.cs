using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helper;
using DatingApp.API.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using System.Collections;

namespace DatingApp.API.Data
{
    public class DatingAppRepo : IDatingAppRepo
    {
        private readonly DataContext _context;
        public DatingAppRepo(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<Message> GetMessage(int messageId)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId);
        }

        public Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            throw new NotImplementedException();
        }

        public async Task<Photos> GetPhoto(int photoId)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.ID == photoId);
            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public Task<PageList<Message>> GetUserMessages()
        {
            throw new NotImplementedException();
        }

        public async Task<PageList<User>> GetUsers(UserPrams prams)
        {

            var users = _context.Users.Include(p => p.Photos).OrderBy(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != prams.Id);
            
            users = users.Where(u => u.Gender == prams.Gender);


            if(prams.Liker) {
                var likers = await GetUserLike(prams.Id,prams.Liker);

               users =  users.Where(u => likers.Contains(u.Id));

            }

            if(prams.Likee) {
                
                var likees = await GetUserLike(prams.Id, prams.Liker);
               users =  users.Where(u => likees.Contains(u.Id));


            }

            if(prams.MinAge != 18 || prams.MaxAge != 99) {
                
                 var minDob = DateTime.Now.AddYears(-(prams.MaxAge + 1));
                 var maxDob = DateTime.Now.AddYears(-prams.MinAge);

                 users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if(!string.IsNullOrEmpty(prams.OrderBy)) {
                switch (prams.OrderBy) {
                    case "created" :
                    users = users.OrderBy(u => u.Created);
                    break;
                    default:
                    users = users.OrderBy(u => u.LastActive);
                    break;

                }
            }

           


            return await PageList<User>.CreateAsync(users, prams.PageNumber, prams.pageSize);
        }

        public void Remove<T>(T entity) where T : class
        {
           _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0 ;
        }

        private async Task<IEnumerable<int>> GetUserLike (int id, bool liker) {
            var users = await _context.Users
            .Include(u => u.Likers)
            .Include(u => u.Likees)
            .FirstOrDefaultAsync(u => u.Id == id);

            if(liker) {
                return users.Likers.Where(l => l.LikeeId == id).Select(l => l.LikerId);
            }

            else {
                return users.Likees.Where(l => l.LikerId == id).Select(l => l.LikeeId);
            }
        }
    }
}