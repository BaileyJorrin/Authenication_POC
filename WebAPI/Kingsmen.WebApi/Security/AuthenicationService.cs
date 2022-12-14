using System;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Kingsmen.WebApi.Models;
using System.Collections.Generic;
using Kingsmen.Domain.Entities;
using Kingsmen.Infrastructure.Services.DataServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph.ExternalConnectors;

namespace Kingsmen.WebApi.Security
{
    public interface IAuthenicationService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
    }

    public class AuthenicationService : IAuthenicationService
    {
        private readonly IUserDataService _userDataService;
        private readonly IConfiguration _config;

        public AuthenicationService(IUserDataService userDataService, IConfiguration config)
        {
            _userDataService = userDataService;
            _config = config;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
           
            //TODO: This code is just for testing.  Prod code would need to validate the password hash
            var user = _userDataService.FindByUserName(model.Username);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            //TODO: Hardcoding the secret.  Prod code would need a strong key that is stored in a vault;
            string secret = _config.GetSection("Jwt:Secret").Value;

            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("User", "Read") }),
                Issuer = _config.GetSection("Jwt:Issuer").Value,
                Audience = _config.GetSection("Jwt:Audience").Value,
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateCurrentToken(string token)
        {
            var mySecret = _config.GetSection("Jwt:Secret").Value;
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));

            var myIssuer = _config.GetSection("Jwt:Issuer").Value;
            var myAudience = _config.GetSection("Jwt:Audience").Value;

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = myIssuer,
                    ValidAudience = myAudience,
                    IssuerSigningKey = mySecurityKey
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}

