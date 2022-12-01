using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Kingsmen.Domain;
using Kingsmen.Domain.Interfaces;
using Kingsmen.Infrastructure.Interfaces;

namespace Kingsmen.Infrastructure.Services
{
    public class EntityService : IEntityService
    {
        public void SetCreateFields(IEntity entity)
        {
            var now = DateTime.UtcNow;
            var easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            var today = TimeZoneInfo.ConvertTimeFromUtc(now, easternZone);
            var currentUser = entity.CreateUser;

            entity.CreateDateTime = today;
            entity.CreateUser = currentUser ?? "System";
            entity.UpdateDateTime = today;
            entity.UpdateUser = currentUser ?? "System";
            entity.IsActive = true;
            entity.IsDeleted = false;
        }

        public void SetCreateFieldsExceptIsActive(IEntity entity)
        {
            var now = DateTime.UtcNow;
            var easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            var today = TimeZoneInfo.ConvertTimeFromUtc(now, easternZone);


            var currentUser = entity.CreateUser;

            entity.CreateDateTime = today;
            entity.CreateUser = currentUser ?? "System";
            entity.UpdateDateTime = today;
            entity.UpdateUser = currentUser ?? "System";
            entity.IsDeleted = false;
        }

        public void SetUpdateFields(IEntity entity)
        {
            var now = DateTime.UtcNow;
            var easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            var today = TimeZoneInfo.ConvertTimeFromUtc(now, easternZone);


            var currentUser = entity.UpdateUser;

            entity.UpdateDateTime = today;
            entity.UpdateUser = currentUser ?? "System";
        }
    }
}
