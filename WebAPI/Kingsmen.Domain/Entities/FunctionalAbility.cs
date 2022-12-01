using System.Collections.Generic;

namespace Kingsmen.Domain.Entities
{
    public class FunctionalAbility : Entity
    {
        public FunctionalAbility() { }

        public string Name { get; set; }
        public string Description { get; set; }

        public List<FunctionalAbilityControlPoint> FunctionalAbilityControlPoints { get; set; }
        public List<RoleFunctionalAbility> RoleFunctionalAbilities { get; set; }
    }
}
