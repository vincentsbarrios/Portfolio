using Domain.Aggregates.Networks;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories.Networks
{
    public class NetworkRepository : EfRepository<Network>, INetworkRepository
    {
        public NetworkRepository(DbContext context) : base(context)
        {
        }
    }
}