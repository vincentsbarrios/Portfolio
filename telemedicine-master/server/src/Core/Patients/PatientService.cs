using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Aggregates.Patients;
using Microsoft.EntityFrameworkCore;

namespace Core.Patients
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;

        public PatientService(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }


        public async Task<Patient> FindById(int id)
        {
            return await _patientRepository.FindById(id);
        }

        public async Task<IEnumerable<Patient>> All(int? id, string idNumber, string foreignIdNumber, string email,
            int? limit,
            bool multipleResults)
        {
            var data = await _patientRepository
                .Filter(patient => !patient.Disabled)
                .Where(x => id == null || x.Id == id)
                .Where(x => idNumber == null || x.IdNumber.Contains(idNumber))
                
                .Where(x => foreignIdNumber == null || x.IdNumber == foreignIdNumber)
                .Where(x => email == null || x.Email == email).ToListAsync();

            IEnumerable<Patient> patients = data;

            if (!multipleResults)
            {
                patients = data.Where(x => idNumber == null || x.IdNumber == idNumber);
            }


            if (limit != null)
            {
                patients = patients.Take(limit.Value);
            }

            return patients;
        }

        public async Task Remove(int id)
        {
            var patient = await _patientRepository.FindById(id);
            await _patientRepository.Disable(patient);
        }

        public async Task Update(int id, Patient patient)
        {
            var updatePatient = await _patientRepository.FindById(id);
            updatePatient.IdNumber = patient.IdNumber;
            updatePatient.Name = patient.Name;
            updatePatient.FirstLastName = patient.FirstLastName;
            updatePatient.SecondLastName = patient.SecondLastName;
            updatePatient.DateOfBirth = patient.DateOfBirth;
            updatePatient.Email = patient.Email;
            updatePatient.Gender = patient.Gender;
            updatePatient.Address = patient.Address;
            updatePatient.Nationality = patient.Nationality;
            updatePatient.Contacts = patient.Contacts;
            await _patientRepository.Update(updatePatient);
        }

        public async Task Create(Patient patient)
        {
            var newPatient = new Patient
            {
                IdNumber = patient.IdNumber,
                Name = patient.Name,
                FirstLastName = patient.FirstLastName,
                SecondLastName = patient.SecondLastName,
                DateOfBirth = patient.DateOfBirth,
                Email = patient.Email,
                Gender = patient.Gender,
                Address = patient.Address,
                Nationality = patient.Nationality,
                Contacts = patient.Contacts
            };

            await _patientRepository.Add(newPatient);
        }
    }
}