
namespace Api.Modules.Hospitals
{
    public class HospitalViewModel
    {
        public int Id { get; set; }

        public int Code { get; set; }
        public string Name { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }

        public string Department { get; set; }
    }
}
