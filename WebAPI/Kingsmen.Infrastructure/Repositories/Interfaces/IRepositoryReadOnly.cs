namespace Kingsmen.Infrastructure.Repositories
{
    public interface IRepositoryReadOnly<T> : IReadRepository<T> where T : class
    {

    }
}
