using System;
using Kingsmen.Domain.Entities;

namespace Kingsmen.WebApi.Models
{
    public class RoleFunctionalAbilityModel
    {
        public RoleFunctionalAbilityModel(RoleFunctionalAbility roleFunctionalAbility) 
        {
            RoleFunctionalAbility_Id = roleFunctionalAbility.Id;
            Role_Id = roleFunctionalAbility.Role_Id;
            FunctionalAbility_Id = roleFunctionalAbility.FunctionalAbility_Id;
            Selected = true;
        }

        public RoleFunctionalAbilityModel(FunctionalAbility functionalAbility)
        {
            FunctionalAbility_Id = functionalAbility.Id;
            Name = functionalAbility.Name;
            Selected = false;
        }

        public Guid? RoleFunctionalAbility_Id { get; set; }
        public Guid FunctionalAbility_Id { get; set; }
        public Guid? Role_Id { get; set; } = Guid.Empty;

        public string Name { get; set; }

        public bool Selected { get; set; }
    }
}
