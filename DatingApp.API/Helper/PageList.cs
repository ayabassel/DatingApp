using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Helper
{
    public class PageList<T> : List<T>
    {
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }

        public PageList(List<T> items, int count, int pagenumber, int pagesize)
        {
            TotalCount = count;
            CurrentPage = pagenumber;
            PageSize = pagesize;
            TotalPages = (int)Math.Ceiling(count / (double)pagesize);
            this.AddRange(items);
        }

        public static async Task<PageList<T>> CreateAsync(IQueryable<T> source, int pagenumber, int pagesize)  {

            var items = await source.Skip(pagesize* (pagenumber - 1)).Take(pagesize).ToListAsync();
            var count =  items.Count();

            return new PageList<T>(items, count, pagenumber, pagesize);
        }
    }
}