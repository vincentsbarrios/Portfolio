using Domain.Aggregates.Patients;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories.Patients
{
    public class PatientRepository: EfRepository<Patient>, IPatientRepository
    {
        public PatientRepository(DbContext context) : base(context)
        {
        }
    }
}