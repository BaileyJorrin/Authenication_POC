using System;
using System.Collections.Generic;
using Kingsmen.Domain.Entities;

namespace Kingsmen.Domain.Dtos
{
    public class FunctionalAbilityDto
    {
        public FunctionalAbilityDto(
            FunctionalAbility functionalAbility
        )
        {
            this.Name = functionalAbility.Name;
            this.Id = functionalAbility.Id;
        }

        public string Name { get; set; }
        public Guid Id  { get; set; }
    }
}
