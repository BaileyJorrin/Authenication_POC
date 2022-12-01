
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kingsmen.Domain.Entities
{
    public class RoleFunctionalAbility : Entity
    {
        public RoleFunctionalAbility() { }

        [ForeignKey("Role")]
        public Guid Role_Id { get; set; }
        public virtual Role Role { get; set; }

        [ForeignKey("FunctionalAbility")]
        public Guid FunctionalAbility_Id { get; set; }
        public virtual FunctionalAbility FunctionalAbility { get; set; }
    }
}
