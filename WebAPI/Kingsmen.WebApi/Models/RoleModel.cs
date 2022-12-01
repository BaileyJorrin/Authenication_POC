using System;
using System.Collections.Generic;
using Kingsmen.Domain.Entities;

namespace Kingsmen.WebApi.Models
{
    public class RoleModel
    {
        public RoleModel(Role role)
        {
            Name = role.Name;
            Description = role.Description;
            SetAuditFields(role);
            RoleFunctionalAbilities = GetChildModelList(role);
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime UpdateDateTime { get; set; }
        public String CreateUser { get; set; }
        public String UpdateUser { get; set; }
        public byte[] RowVersion { get; set; }


        public List<RoleFunctionalAbilityModel> RoleFunctionalAbilities { get; set; }

        private void SetAuditFields(Role role)
        {
            Id = role.Id;
            IsActive = role.IsActive;
            IsDeleted = role.IsDeleted;
            CreateDateTime = role.CreateDateTime;
            UpdateDateTime = role.UpdateDateTime;
            CreateUser = role.CreateUser;
            UpdateUser = role.UpdateUser;

        }

        private List<RoleFunctionalAbilityModel> GetChildModelList(Role role)
        {
            var childList = new List<RoleFunctionalAbilityModel>();

            foreach(var fa in role.RoleFunctionalAbilities)
            {
                var model = new RoleFunctionalAbilityModel(fa);

                childList.Add(model);
            }

            return childList;
        }
    }
}
