using System;
using System.Collections.Generic;

namespace Kingsmen.Domain.Entities
{
	public class ConfigurationItem:Entity
	{
		public ConfigurationItem()
		{
					
		}

		public string ItemName { get; set; }
		public string ItemValue { get; set; }
		public Guid? ParentId { get; set; }

	}
}

