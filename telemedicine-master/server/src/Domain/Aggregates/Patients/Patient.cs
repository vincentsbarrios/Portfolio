using Domain.Contracts;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Aggregates.Patients
{
    public class Patient : BaseEntity, IAggregateRoot
    {

        public string IdNumber { get; set; }

        public string Name { get; set; }

        public string FirstLastName { get; set; }

        public string SecondLastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Email { get; set; }

        public string Gender { get; set; }

        public string Address { get; set; }

        public string Nationality { get; set; }

        [Column(TypeName = "jsonb")] public string Contacts { get; set; }


    }
}
