using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kingsmen.Domain.Entities;

namespace Kingsmen.Infrastructure.Interfaces.DataServices
{
    public interface IConfigurationItemDataService
    {
        Task<ICollection<ConfigurationItem>> GetActiveConfigurationItems(Guid parentId);
    }
}
