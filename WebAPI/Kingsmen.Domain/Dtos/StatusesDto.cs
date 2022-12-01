using System;
using System.Collections.Generic;

namespace Kingsmen.Domain.Dtos
{
	public class StatusesDto
	{
		public StatusesDto()
		{
		}

		public bool WasSuccessful { get; set; }

		public ICollection<string> StatusMessages { get; set; }
	}
}

