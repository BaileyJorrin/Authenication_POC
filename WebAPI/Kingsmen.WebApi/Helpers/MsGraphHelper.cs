using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Microsoft.Identity.Client;

namespace Kingsmen.WebApi.Helpers
{
    public class MsGraphHelper
    {
        private readonly IConfiguration _config;
        public MsGraphHelper(IConfiguration config)
        {
            _config = config;
        }

        public GraphServiceClient GetGraphClient()
        {
            var graphClient = new GraphServiceClient(new DelegateAuthenticationProvider(async (requestMessage) =>
            {
                // get an access token for Graph
                var accessToken = await GetAccessToken();

                requestMessage
                    .Headers
                    .Authorization = new AuthenticationHeaderValue("bearer", accessToken);

                return;
            }));

            return graphClient;
        }

        public async Task<string> GetAccessToken()
        {
            var clientId = _config.GetSection("AzureAd:ClientId").Value;
            var clientSecret = _config.GetSection("AzureAd:ClientSecret").Value;
            var tenantId = _config.GetSection("AzureAd:TenantId").Value;

            IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(clientId)
              .WithClientSecret(clientSecret)
              .WithAuthority($"https://login.microsoftonline.com/{tenantId}")
              .WithRedirectUri("https://localhost")
              .Build();

            string[] scopes = new string[] { "https://graph.microsoft.com/.default" };

            var result = await app.AcquireTokenForClient(scopes).ExecuteAsync();

            return result.AccessToken;
        }
    }
}
