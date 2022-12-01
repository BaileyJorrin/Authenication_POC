#nullable disable
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kingsmen.Domain.Entities
{
    public class UserRole
    {
        public UserRole() { }

        [Key]
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid User_Id { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Role")]
        public Guid Role_Id { get; set; }
        public virtual Role Role { get; set; }
    }
}
