using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace Kingsmen.Infrastructure.Repositories
{
    public class UnitOfWork<TContext> : IRepositoryFactory, IUnitOfWork<TContext>
       where TContext : DbContext
    {
        internal Dictionary<Type, object> _repositories;
        internal Dictionary<Type, object> _asyncRepositories;
        internal Dictionary<Type, object> _readOnlyRepositories;

        public UnitOfWork(TContext context)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (_repositories == null)
            {
                _repositories = new Dictionary<Type, object>();
            }

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type))
            {
                _repositories[type] = new Repository<TEntity>(Context);
            }

            return (IRepository<TEntity>)_repositories[type];
        }

        public IAsyncRepository<TEntity> GetAsyncRepository<TEntity>() where TEntity : class
        {
            if (_asyncRepositories == null)
            {
                _asyncRepositories = new Dictionary<Type, object>();
            }

            var type = typeof(TEntity);
            if (!_asyncRepositories.ContainsKey(type))
            {
                _asyncRepositories[type] = new AsyncRepository<TEntity>(Context);
            }

            return (IAsyncRepository<TEntity>)_asyncRepositories[type];
        }

        public IRepositoryReadOnly<TEntity> GetReadOnlyRepository<TEntity>() where TEntity : class
        {
            if (_readOnlyRepositories == null)
            {
                _readOnlyRepositories = new Dictionary<Type, object>();
            }

            var type = typeof(TEntity);
            if (!_readOnlyRepositories.ContainsKey(type))
            {
                _readOnlyRepositories[type] = new RepositoryReadOnly<TEntity>(Context);
            }

            return (IRepositoryReadOnly<TEntity>)_readOnlyRepositories[type];
        }

        public TContext Context { get; }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await Context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            Context?.Dispose();
        }
    }
}
