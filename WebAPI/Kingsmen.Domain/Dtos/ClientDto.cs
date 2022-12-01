using System;

namespace Kingsmen.Domain.Dtos
{
    public class ClientDto
    {
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
