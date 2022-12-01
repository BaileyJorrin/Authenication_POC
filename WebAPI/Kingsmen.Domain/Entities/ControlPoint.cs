using System.Collections.Generic;

namespace Kingsmen.Domain.Entities
{
    public class ControlPoint : Entity
    {
        public ControlPoint() { }

        public string Name { get; set; }
        public string FriendlyName { get; set; }

        public List<FunctionalAbilityControlPoint> FuntionalAbilityControlPoints { get; set; }
    }
}
