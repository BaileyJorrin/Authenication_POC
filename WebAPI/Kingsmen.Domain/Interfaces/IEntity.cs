using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kingsmen.Domain.Interfaces
{
    public interface IEntity
    {
        Guid Id { get; set; }

        bool IsActive { get; set; }
        bool IsDeleted { get; set; }

        DateTime CreateDateTime { get; set; }
        DateTime UpdateDateTime { get; set; }

        String CreateUser { get; set; }
        String UpdateUser { get; set; }
    }
}
