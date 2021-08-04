using Domain.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Domain.Aggregates.Networks;

namespace Domain.Aggregates.Hospitals
{
    public class Hospital : BaseEntity, IAggregateRoot
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Department { get; set; }
        public string Category { get; set; }
        [Column(TypeName = "jsonb")] public string Contacts { get; set; }

        [Column(TypeName = "jsonb")] public string Services { get; set; }

        public Network Network { get; set; }

        public int NetworkId { get; set; }
    }
}