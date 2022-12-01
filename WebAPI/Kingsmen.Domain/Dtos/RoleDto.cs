using System;
using System.Collections.Generic;
using Kingsmen.Domain.Entities;

namespace Kingsmen.Domain.Dtos
{
    public class RoleDto
    {
        public RoleDto(
            Role role,
            bool isAssociatedWithUser)
        {
            this.Name = role.Name;
            this.Id = role.Id;
            this.IsAssociatedWithUser = isAssociatedWithUser;
            this.FunctionalAbilities = SetRoleFunctionalAbilities(role);
        }

        public RoleDto(Role role)
        {
            this.Name = role.Name;
            this.Id = role.Id;
            this.IsAssociatedWithUser = false;
        }

        public string Name { get; set; }
        public Guid Id { get; set; }
        public List<FunctionalAbilityDto> FunctionalAbilities { get; set; }
        public bool IsAssociatedWithUser { get; set; }

        private List<FunctionalAbilityDto> SetRoleFunctionalAbilities(Role role)
        {
            List<FunctionalAbilityDto> associatedFunctionalAbilities = new List<FunctionalAbilityDto>();

            foreach(var r in role.RoleFunctionalAbilities)
            {
                associatedFunctionalAbilities.Add(new FunctionalAbilityDto(r.FunctionalAbility));
            }

            return associatedFunctionalAbilities;
        }

    }

}
