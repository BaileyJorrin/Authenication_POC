using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kingsmen.Domain.Entities;

namespace Kingsmen.Domain.Dtos
{
    public class UserRoleDto { 
        public UserRoleDto(
            User user,
            List<RoleDto> roles
            )
        {
          
            FirstName = user.FirstName;
            LastName = user.LastName;
            IsActive = user.IsActive;
            CreateDateTime = user.CreateDateTime;
            UpdateDateTime = user.UpdateDateTime;
            this.Roles = roles;
            this.ID = user.Id;
        }

        public Guid ID { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime UpdateDateTime { get; set; }
        public List<RoleDto> Roles { get; set; }

    }

}
