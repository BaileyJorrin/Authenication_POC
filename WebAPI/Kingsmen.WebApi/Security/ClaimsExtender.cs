using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Kingsmen.Security
{
    public class ClaimsExtender:IClaimsTransformation
    {

        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            if (principal.HasClaim("myClaim", "myValue"))
            {
                return Task.FromResult(principal);
            }

            Claim claim = new Claim("myClaim", "myValue");
            ClaimsIdentity claimIden = new ClaimsIdentity();
            claimIden.AddClaim(claim);
            principal.AddIdentity(claimIden);
            // Add additional claims here.
            return Task.FromResult(principal);
        }
    }
}
