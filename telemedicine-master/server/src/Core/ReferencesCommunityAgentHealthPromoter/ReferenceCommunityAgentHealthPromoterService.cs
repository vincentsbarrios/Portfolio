using Domain.Aggregates.ReferencesACS_PS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Aggregates.Hospitals;

namespace Core.ReferencesACS_PS
{
    public class ReferenceCommunityAgentHealthPromoterService : IReferenceCommunityAgentHealthPromoterService
    {

        private readonly IReferenceCommunityAgentHealthPromoterRepository _referenceACS_PSRepository;
				private readonly IHospitalRepository _hospitalRepository;

        public ReferenceCommunityAgentHealthPromoterService(IReferenceCommunityAgentHealthPromoterRepository referenceACS_PSRepository, IHospitalRepository hospitalRepository)
        {
            _referenceACS_PSRepository = referenceACS_PSRepository;
						_hospitalRepository = hospitalRepository;
        }


        public async Task<ReferenceCommunityAgentHealthPromoter> FindById(int id)
        {
            return await _referenceACS_PSRepository.FindById(id);
        }

        public async Task<IEnumerable<ReferenceCommunityAgentHealthPromoter>> All(int? id)
        {
            return await _referenceACS_PSRepository
                .Filter(network => !network.Disabled)
                .Where(x => id == null || x.Id == id)
                .ToListAsync();
        }

        public async Task Remove(int id)
        {
            var reference = await _referenceACS_PSRepository.FindById(id);
            await _referenceACS_PSRepository.Disable(reference);
        }

        public async Task Create(ReferenceCommunityAgentHealthPromoter reference)
        {
						var newOriginHF = await _hospitalRepository.FindById(reference.OriginHfId);
						var newDestinationHF = await _hospitalRepository.FindById(reference.DestinationHfId);

						var newReference = new ReferenceCommunityAgentHealthPromoter {
							Community = reference.Community,
							Referrer = reference.Referrer,
							ReferrerPhone = reference.ReferrerPhone,
							ReferrerEmail = reference.ReferrerEmail,
							ActionTaken = reference.ActionTaken,
							PatientId = reference.PatientId,
							Motive = reference.Motive,
							Date = reference.Date,
                            OriginHF = newOriginHF,
							DestinationHF = newDestinationHF
						};

            await _referenceACS_PSRepository.Add(newReference);
        }

		public async Task Update(int id, ReferenceCommunityAgentHealthPromoter reference)
		{
			var newOriginHF = await _hospitalRepository.FindById(reference.OriginHfId);
			var newDestinationHF = await _hospitalRepository.FindById(reference.DestinationHfId);

            var updateReference = await _referenceACS_PSRepository.FindById(id);
            updateReference.Community = reference.Community;
            updateReference.Referrer = reference.Referrer;
            updateReference.ReferrerPhone = reference.ReferrerPhone;
            updateReference.ReferrerEmail = reference.ReferrerEmail;
            updateReference.ActionTaken = reference.ActionTaken;
            updateReference.PatientId = reference.PatientId;
            updateReference.Motive = reference.Motive;
            updateReference.Date = reference.Date;
            updateReference.OriginHF = newOriginHF;
            updateReference.DestinationHF = newDestinationHF;

            await _referenceACS_PSRepository.Update(updateReference);
		}

	}
}
