using Core.Hospitals;
using Core.Networks;
using Core.Patients;
using Data.Contexts;
using Data.Repositories;
using Data.Repositories.Hospitals;
using Data.Repositories.Networks;
using Domain.Aggregates.Hospitals;
using Data.Repositories.Patients;
using Domain.Aggregates.Networks;
using Domain.Aggregates.Patients;
using Domain.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Data.Repositories.References;
using Domain.Aggregates.Reference;
using Core.References;
using Data.Repositories.ReferencesACS_PS;
using Domain.Aggregates.ReferencesACS_PS;
using Core.ReferencesACS_PS;

namespace Api
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
            services.AddDbContext<TelemedicineContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers();

            services.AddScoped<DbContext, TelemedicineContext>();
            services.AddScoped(typeof(IBaseRepository<>), typeof(EfRepository<>));
            services.AddScoped<IHospitalRepository, HospitalRepository>();
            services.AddScoped<IHospitalService, HospitalService>();
            services.AddScoped<INetworkRepository, NetworkRepository>();
            services.AddScoped<INetworkService, NetworkService>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IPatientService, PatientService>();
            services.AddScoped<IReferenceRepository, ReferenceRepository>();
            services.AddScoped<IReferenceService, ReferenceService>();
            services.AddScoped<IReferenceCommunityAgentHealthPromoterRepository, ReferenceCommunityAgentHealthPromoterRepository>();
            services.AddScoped<IReferenceCommunityAgentHealthPromoterService, ReferenceCommunityAgentHealthPromoterService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}