using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Kingsmen.Security;
using Kingsmen.Infrastructure.Data;
using System.Reflection;

using Kingsmen.Infrastructure.Services.DataServices;
using Kingsmen.CoreServices.Interfaces;
using Kingsmen.CoreServices.Services;
using Kingsmen.Infrastructure.Interfaces;
using Kingsmen.Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Kingsmen.Infrastructure.Repositories.DependencyInjection;
using System.Text.Json.Serialization;
using AutoMapper;
using System;
using Kingsmen.WebApi.Helpers;
using Kingsmen.Infrastructure.Interfaces.DataServices;
using Kingsmen.WebApi.Helpers.UserSync;
using Kingsmen.WebApi.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Kingsmen.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            IdentityModelEventSource.ShowPII = true;

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                        ValidIssuer = Configuration.GetSection("Jwt:Issuer").Value,
                        ValidAudience = Configuration.GetSection("Jwt:Audience").Value,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Jwt:Secret").Value)),
                        ClockSkew = new TimeSpan(0,5,0), 
                    };

                })
                .AddJwtBearer("AzureAD", options =>
                {
                    options.Audience = Configuration.GetSection("Jwt:Audience").Value;
                    options.Authority = "https://login.microsoftonline.com/eb971100-7f436/";
                });

            // Authorization
            //services.AddAuthorization(options =>
            //{
            //    var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
            //        JwtBearerDefaults.AuthenticationScheme,
            //        "AzureAD");
            //    defaultAuthorizationPolicyBuilder =
            //        defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();
            //    options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
            //});

            services.AddCors(options =>
            {
                options.AddPolicy("kingsmenCORS",
                    policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            });

            services.AddControllersWithViews();

            services.AddControllers()
                .AddJsonOptions(options =>
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            services.AddDbContext<KingsmendbContext>(
                options => options.UseSqlServer(Configuration.GetSection("ConnectionStrings:KingsmenDbConnectionString").Value,
                  o => o.CommandTimeout(900).EnableRetryOnFailure()
                  ),ServiceLifetime.Transient
                ).AddUnitOfWork<KingsmendbContext>();

            services.AddTransient<KingsmendbContext>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            //Core Services
            services.AddScoped<IClaimsTransformation, ClaimsExtender>();
            services.AddTransient<IEntityService, EntityService>();
            services.AddScoped<ILoggingService, LoggingService>();
            services.AddScoped<IAuthenicationService, AuthenicationService>();

            //Entity Services
            services.AddTransient<IClientDataService, ClientDataService>();
            services.AddTransient<IControlPointDataService, ControlPointDataService>();
            services.AddTransient<IFunctionalAbilityDataService, FunctionalAbilityDataService>();
            services.AddTransient<IRoleDataService, RoleDataService>();
            services.AddTransient<IUserDataService, UserDataService>();
            services.AddTransient<IConfigurationItemDataService, ConfigurationItemDataService>();

            //Helpers
            services.AddTransient<UserSyncHelper>();
            services.AddTransient<MsGraphHelper>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
            //CurrentRequestContext.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
            //app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors("kingsmenCORS");
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}").RequireCors("kingsmenCORS");
            });
        }
    }
}
