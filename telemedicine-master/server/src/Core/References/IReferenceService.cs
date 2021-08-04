using Domain.Aggregates.Reference;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.References
{
    public interface IReferenceService
    {
        public Task<Reference> FindById(int id);

        public Task Create(Reference reference);

        public Task<IEnumerable<Reference>> All(int? id);

        public Task Remove(int id);

        public Task Update(int id, Reference reference);

    }
}
