using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Aggregates.Patients;

namespace Core.Patients
{
    public interface IPatientService
    {
        public Task<Patient> FindById(int id);

        public Task Create(Patient patient);

        public Task<IEnumerable<Patient>> All(int? id, string idNumber, string foreignIdNumber, string email, int? limit,
            bool exactMatch);

        public Task Remove(int id);

        public Task Update(int id, Patient patient);
    }
}