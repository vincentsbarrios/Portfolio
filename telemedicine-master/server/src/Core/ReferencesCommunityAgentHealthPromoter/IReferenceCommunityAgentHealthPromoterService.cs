using Domain.Aggregates.ReferencesACS_PS;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.ReferencesACS_PS
{
    public interface IReferenceCommunityAgentHealthPromoterService
    {

        public Task<ReferenceCommunityAgentHealthPromoter> FindById(int id);

        public Task Create(ReferenceCommunityAgentHealthPromoter reference);

        public Task<IEnumerable<ReferenceCommunityAgentHealthPromoter>> All(int? id);

        public Task Remove(int id);

        public Task Update(int id, ReferenceCommunityAgentHealthPromoter reference);

    }
}
