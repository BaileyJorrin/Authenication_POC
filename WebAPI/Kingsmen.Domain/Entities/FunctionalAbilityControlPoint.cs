using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kingsmen.Domain.Entities
{
    public class FunctionalAbilityControlPoint : Entity
    {
        public FunctionalAbilityControlPoint() { }

        [ForeignKey("FunctionalAbility")]
        public Guid FunctionalAbility_Id { get; set; }
        public virtual FunctionalAbility FunctionalAbility { get; set; }

        [ForeignKey("ControlPoint")]
        public Guid ControlPoint_Id { get; set; }
        public virtual ControlPoint ControlPoint { get; set; }


        public bool CanView { get; set; }
        public bool CanAddUpdate { get; set; }
        public bool CanDelete { get; set; }
        public bool CanExecute { get; set; }

    }
}