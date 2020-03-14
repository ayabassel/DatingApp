using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using DatingApp.API.Data;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DatingApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            // using(var scope = host.Services.CreateScope() )
            // {
            //     var services = scope.ServiceProvider;
            //     try
            //     {
            //         var context = services.GetRequiredService<DataContext>();
            //         context.Database.Migrate();
            //         seed.seedUsers(context);
            //     }
            //     catch(Exception ex)
            //     {
            //         var logger = services.GetRequiredService<ILogger<Program>>(); 
            //         logger.LogError(ex, "Error occurred during migration");
            //     }

                
            //    host.Run();
            // }
        }
        

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
