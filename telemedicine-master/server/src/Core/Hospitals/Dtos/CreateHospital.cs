namespace Core.Hospitals.Dtos
{
    public class CreateHospital
    {
        public int Code { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Department { get; set; }

        public string Category { get; set; }

        public string Contacts { get; set; }

        public string Services { get; set; }

        public int NetworkId { get; set; }
    }
}