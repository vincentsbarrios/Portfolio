using System.Collections;
using System.Collections.Generic;
using Domain.Aggregates.Hospitals;
using Domain.Contracts;

namespace Domain.Aggregates.Networks
{
    public class Network : BaseEntity, IAggregateRoot
    {
        public string Name { get; set; }

        public ICollection<Hospital> Hospitals { get; set; } = new HashSet<Hospital>();
    }
}