using Domain.Aggregates.Hospitals;
using Domain.Aggregates.Reference;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories.References
{
    public class ReferenceRepository : EfRepository<Reference>, IReferenceRepository
    {
        public ReferenceRepository(DbContext context) : base(context)
        {

        }

    }
}
