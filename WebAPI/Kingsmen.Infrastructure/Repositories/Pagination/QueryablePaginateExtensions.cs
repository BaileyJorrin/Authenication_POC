using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace Kingsmen.Infrastructure.Repositories.Pagination
{
    public static class QueryablePaginateExtensions
    {
        public static async Task<IPaginate<T>> ToPaginateAsync<T>(
            this IQueryable<T> source,
            int index,
            int size,
            int from = 0,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            ValidateParameters(index, from);

            var count = await source.CountAsync(cancellationToken).ConfigureAwait(false);

            var items = await source
                .Skip((index - from) * size)
                .Take(size)
                .ToListAsync(cancellationToken)
                .ConfigureAwait(false);

            var list = new Paginate<T>
            {
                Index = index,
                Size = size,
                From = from,
                Count = count,
                Items = items,
                Pages = (int)Math.Ceiling(count / (double)size)
            };

            return list;
        }

        private static void ValidateParameters(int index, int from)
        {
            if (from > index)
            {
                throw new ArgumentException($"{nameof(from)}: {from} > {nameof(index)}: {index}, must {nameof(from)} <= {nameof(index)}");
            }
        }
    }
}
