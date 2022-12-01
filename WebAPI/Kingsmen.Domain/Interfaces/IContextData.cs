using System;

namespace Kingsmen.Domain.Interfaces
{
    public interface IContextData
    {
        string DatabaseConnectionString { get; set; }
    }
}
