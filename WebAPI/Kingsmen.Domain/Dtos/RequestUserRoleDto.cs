using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kingsmen.Domain.Entities;

namespace Kingsmen.Domain.Dtos
{
    public class RequestUserRoleDto
    {
        public RequestUserRoleDto(
            Guid id,
            DateTime updateDateTime,
            List<UserRoleRoleDto> roles
            )
        {
            this.ID = id;
            UpdateDateTime = updateDateTime;
            this.Roles = roles; 
        }

        public Guid ID { get; set; }
        public DateTime UpdateDateTime { get; set; }
        public List<UserRoleRoleDto> Roles { get; set; }

        

    }

    public class UserRoleRoleDto
    {
        public UserRoleRoleDto(
        Guid id,
        string name,
        bool isAssociatedWithUser)
        {
            this.Name = name;
            this.Id = id;
            this.IsAssociatedWithUser = isAssociatedWithUser; 

        }
        public Guid Id { get; set; }
        public String Name { get; set; }
        public bool IsAssociatedWithUser { get; set; }
    }


}
