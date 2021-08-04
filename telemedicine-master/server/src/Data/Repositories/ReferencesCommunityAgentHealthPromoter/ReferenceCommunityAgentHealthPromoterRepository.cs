using Domain.Aggregates.ReferencesACS_PS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Repositories.ReferencesACS_PS
{
    public class ReferenceCommunityAgentHealthPromoterRepository : EfRepository<ReferenceCommunityAgentHealthPromoter>, IReferenceCommunityAgentHealthPromoterRepository
    {
        public ReferenceCommunityAgentHealthPromoterRepository(DbContext context) : base(context)
        {

        }

    }
}
