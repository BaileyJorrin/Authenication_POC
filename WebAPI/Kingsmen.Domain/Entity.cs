using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kingsmen.Domain.Interfaces;

namespace Kingsmen.Domain
{
        
    public abstract class Entity : IEntity
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime CreateDateTime { get; set; }

        public DateTime UpdateDateTime { get; set; }

        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        [MaxLength(250)]
        public String CreateUser { get; set; }

        [MaxLength(250)]
        public String UpdateUser { get; set; }        
    }
}
