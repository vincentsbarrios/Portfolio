using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Api.Modules.References
{
    public class ReferenceViewModel
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int OriginHfId { get; set; }
        public int DestinationHfId { get; set; }
        public int PatientId { get; set; }
		public string Institution { get; set; }
        public string Motive { get; set; }
        public string DescriptionMotive { get; set; }
        public string Symptoms { get; set; }
        public string MedicalSummary { get; set; }
        public string VitalSigns { get; set; }
        public string ObGyn { get; set; }
        public string PhysicalExamination { get; set; }
        public string ComplementaryExams { get; set; }
        public string DiagnosticImpression { get; set; }
        public string Observations { get; set; }
        public bool Risk { get; set; }
        public string AttentionRequired { get; set; }
        public string MadeBy { get; set; }
        public bool ContactedHf { get; set; }
        public string ContactId { get; set; }
        public DateTime Date { get; set; }
        public string Companion { get; set;}
        public string Relationship { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }
}
