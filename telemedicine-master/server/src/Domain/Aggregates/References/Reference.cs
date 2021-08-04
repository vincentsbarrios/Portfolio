using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;
using Domain.Contracts;
using Domain.Aggregates.Hospitals;

namespace Domain.Aggregates.Reference
{
    public class Reference : BaseEntity, IAggregateRoot
    {
        public string Type { get; set; }
        public int PatientId { get; set; }
        public string Motive { get; set; }
        public string DescriptionMotive { get; set; }
				public string Institution { get; set; }
        public string Symptoms { get; set; }
        public string MedicalSummary { get; set; }

        [Column(TypeName = "json")]
        public string VitalSigns { get; set; }

        [Column(TypeName = "json")]
        public string ObGyn { get; set; }

        [Column(TypeName = "json")]
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

        public int OriginHfId { get; set; }
        public int DestinationHfId { get; set; }

				public Hospital OriginHF { get; set; }
				public Hospital DestinationHF { get; set; }

    }
}
