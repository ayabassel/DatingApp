using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Helper
{
    public static class Extentions
    {
        public static void AddApplicationError(this HttpResponse response,string message){
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }

        public static void AddPagination(this HttpResponse response, int totalItems, int totalPages, int pageSize, int pageNember) {
            var paginationHeader = new PaginationHeader(pageNember, pageSize, totalPages, totalItems);
            var camelFormatter = new JsonSerializerSettings();
            camelFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelFormatter));
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");

        }

        public static int CalculateAge (this DateTime theBirthDate)
        {
            var age = DateTime.Today.Year - theBirthDate.Year;
            if (theBirthDate.AddYears(age) > DateTime.Now)
            {
                  age--;
            }
            return age;    

        }


    }
}