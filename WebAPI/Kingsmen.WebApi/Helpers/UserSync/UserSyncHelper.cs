using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace Kingsmen.WebApi.Helpers.UserSync
{
    public class UserSyncHelper
    {
        private readonly MsGraphHelper _msGraph;
        private readonly IConfiguration _config;

        public UserSyncHelper(MsGraphHelper msGraph, IConfiguration config)
        {
            _msGraph = msGraph;
            _config = config;
        }

        public string GetAllAzureAdUsers()
        {

            var users = new List<Domain.Entities.User>();
            var isRealAndIsEmployee = new Regex($"^[a-zA-Z]+\\.[a-zA-Z]+@{_config.GetSection("AzureAd:Domain").Value}$"); //Ensuring the user has a valid Email
            var graphServiceClient = _msGraph.GetGraphClient();

            var allUsers = graphServiceClient
                .Users
                .Request()
                .Top(999)
                .Select("mail,givenName,surname,id,accountEnabled")
                .GetAsync();

            foreach (Microsoft.Graph.User user in allUsers.Result)
            {
                if (user.Mail != null && isRealAndIsEmployee.IsMatch(user.Mail))
                {
                    Domain.Entities.User ksUser = new Domain.Entities.User()
                    {
                        Email = user.Mail,
                        FirstName = user.GivenName,
                        LastName = user.Surname,
                        Id = System.Guid.Parse(user.Id),
                        IsActive = (bool)user.AccountEnabled,
                    };

                    users.Add(ksUser);
                }
            }

            var jsonUsers = JsonSerializer.Serialize(users);

            return jsonUsers;
        }

    }
}
