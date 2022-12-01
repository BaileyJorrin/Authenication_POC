using System;
namespace Kingsmen.Domain.Dtos
{
	public class AssignedPermissionDto
	{
		public AssignedPermissionDto(
			string controlPoint,
			bool canView,
			bool canAddUpdate,
			bool canDelete,
			bool canExecute)
		{
			ControlPointName = controlPoint;
			CanView = canView;
			this.CanAddUpdate = canAddUpdate;
			this.CanDelete = canDelete;
			this.CanExecute = canExecute;
		}

        public string ControlPointName { get; set; }
		public bool CanView{ get; set; }
        public bool CanAddUpdate { get; set; }
        public bool CanDelete { get; set; }
        public bool CanExecute { get; set; }
    }
}

