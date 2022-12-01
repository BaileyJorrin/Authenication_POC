using Kingsmen.Domain;
using Kingsmen.Domain.Interfaces;

namespace Kingsmen.Infrastructure.Interfaces
{
    public interface IEntityService
    {
        void SetCreateFields(IEntity entity);
        void SetCreateFieldsExceptIsActive(IEntity entity);
        void SetUpdateFields(IEntity entity);
    }
}
