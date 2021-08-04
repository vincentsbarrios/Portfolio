using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryStore.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using GroceryStore.Core.Interfaces;
using GroceryStore.Infrastructure.Repository;
using GroceryStore.Core.Services;
using Microsoft.AspNetCore.Http;
using GroceryStore.api.Middlewares;

namespace GroceryStore.api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors();
            services.AddHttpContextAccessor();
            services.AddDbContext<GroceryDbContext>((s, o) => o.UseSqlite("Data Source=tunedb.db"));
            services.AddScoped(typeof(IRepository<>), typeof(EntityFrameworkRepository<>));
            services.AddScoped(typeof(IGroceryRepository<>), typeof(GroceryRepository<>));
            services.AddScoped(typeof(IWarehouseRepository<>), typeof(WarehouseRepository<>));
            services.AddScoped<IUserRegisterService, UserRegisterService>();
            services.AddScoped<IGroceryService, GroceryService>();
            services.AddScoped<IWarehouseService, WarehouseService>();
            services.AddScoped<IVoiceService, VoiceService>();
            services.AddScoped<IReminderService, ReminderService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());


            app.UseWhen(IsVerifyRequestNeeded, applicationBuilder => applicationBuilder.UseMiddleware<UserMiddleware>());
           
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private bool IsVerifyRequestNeeded(HttpContext context)
        {
            var PassUrl = context.Request.Path.StartsWithSegments("/api/user/verify") || context.Request.Path.StartsWithSegments("/api/user/newuser");
                                            

            return !PassUrl && context.Request.Path.StartsWithSegments("/api");

        }

    }
}
