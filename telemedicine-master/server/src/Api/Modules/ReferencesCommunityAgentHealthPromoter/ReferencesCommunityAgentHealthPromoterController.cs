using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.ReferencesACS_PS;
using Domain.Aggregates.ReferencesACS_PS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.ReferencesACS_PS
{
    [Route("[controller]")]
    [ApiController]
    public class ReferencesCommunityAgentHealthPromoterController : Controller
    {

        private readonly IReferenceCommunityAgentHealthPromoterService _referenceACS_PSService;

        public ReferencesCommunityAgentHealthPromoterController(IReferenceCommunityAgentHealthPromoterService referenceACS_PSService)
        {
            _referenceACS_PSService = referenceACS_PSService;
        }


        [HttpGet("{id:int?}")]
        public async Task<IActionResult> Get(int? id)
        {
            var data = (await _referenceACS_PSService.All(id))
                .Select(reference => new ReferenceCommunityAgentHealthPromoterViewModel
                {
                    Id = reference.Id,
                    Date = reference.Date,
                    Community = reference.Community,
                    Motive = reference.Motive,
                    Referrer = reference.Referrer,
                		PatientId = reference.PatientId,
                    ReferrerPhone = reference.ReferrerPhone,
                    ReferrerEmail = reference.ReferrerEmail,
                    ActionTaken = reference.ActionTaken,
                    OriginHfId = reference.OriginHfId,
                    DestinationHfId = reference.DestinationHfId,

                });

            return Ok(data);
        }


        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _referenceACS_PSService.Remove(id);
        }

        [HttpPost]
        public async Task Post(ReferenceCommunityAgentHealthPromoterViewModel referenceACS_PSViewModel)
        {
            var reference = new ReferenceCommunityAgentHealthPromoter
            {
                Id = referenceACS_PSViewModel.Id,
                Date = referenceACS_PSViewModel.Date,
                Community = referenceACS_PSViewModel.Community,
                PatientId = referenceACS_PSViewModel.PatientId,
                Motive = referenceACS_PSViewModel.Motive,
                Referrer = referenceACS_PSViewModel.Referrer,
                ReferrerPhone = referenceACS_PSViewModel.ReferrerPhone,
                ReferrerEmail = referenceACS_PSViewModel.ReferrerEmail,
                ActionTaken = referenceACS_PSViewModel.ActionTaken,
                OriginHfId = referenceACS_PSViewModel.OriginHfId,
                DestinationHfId = referenceACS_PSViewModel.DestinationHfId,

            };

            await _referenceACS_PSService.Create(reference);
        }

        [HttpPut("{id:int}")]
        public async Task Put(int id, ReferenceCommunityAgentHealthPromoterViewModel referenceACS_PSViewModel)
        {

            var reference = new ReferenceCommunityAgentHealthPromoter
            {
                Id = referenceACS_PSViewModel.Id,
                Date = referenceACS_PSViewModel.Date,
                Community = referenceACS_PSViewModel.Community,
                PatientId = referenceACS_PSViewModel.PatientId,
                Motive = referenceACS_PSViewModel.Motive,
                Referrer = referenceACS_PSViewModel.Referrer,
                ReferrerPhone = referenceACS_PSViewModel.ReferrerPhone,
                ReferrerEmail = referenceACS_PSViewModel.ReferrerEmail,
                ActionTaken = referenceACS_PSViewModel.ActionTaken,
                OriginHfId = referenceACS_PSViewModel.OriginHfId,
                DestinationHfId = referenceACS_PSViewModel.DestinationHfId,

            };

            await _referenceACS_PSService.Update(id, reference);
        }
    }
}
