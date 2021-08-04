using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Modules.ReferencesACS_PS
{
    public class ReferenceCommunityAgentHealthPromoterViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Community { get; set; }
        public int PatientId { get; set; }
        public string Motive { get; set; }
        public string Referrer { get; set; }
        public string ReferrerPhone { get; set; }
        public string ReferrerEmail { get; set; }
        public string ActionTaken { get; set; }
        public int OriginHfId { get; set; }
        public int DestinationHfId { get; set; }
    }
}
