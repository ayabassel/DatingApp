using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helper
{
    public static class Extentions
    {
        public static void AddApplicationError(this HttpResponse response,string message){
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
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