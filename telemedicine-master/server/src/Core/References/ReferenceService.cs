using Domain.Aggregates.Reference;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Aggregates.Hospitals;
namespace Core.References
{
    public class ReferenceService : IReferenceService
    {

        private readonly IReferenceRepository _referenceRepository;
		private readonly IHospitalRepository _hospitalRepository;

        public ReferenceService(IReferenceRepository referenceRepository, IHospitalRepository hospitalRepository)
        {
            _referenceRepository = referenceRepository;
			_hospitalRepository = hospitalRepository;
        }


        public async Task<Reference> FindById(int id)
        {
            return await _referenceRepository.FindById(id);
        }

        public async Task<IEnumerable<Reference>> All(int? id)
        {
            return await _referenceRepository
                .Filter(network => !network.Disabled)
                .Where(x => id == null || x.Id == id)
                .ToListAsync();
        }

        public async Task Remove(int id)
        {
            var reference = await _referenceRepository.FindById(id);
            await _referenceRepository.Disable(reference);
        }

        public async Task Create(Reference reference)
        {
			var newOriginHF = await _hospitalRepository.FindById(reference.OriginHfId);
			var newDestinationHF = await _hospitalRepository.FindById(reference.DestinationHfId);

			var newReference = new Reference {
				Type = reference.Type,
				PatientId = reference.PatientId,
				Motive = reference.Motive,
				Institution = reference.Institution,
				DescriptionMotive = reference.DescriptionMotive,
				Symptoms = reference.Symptoms,
				MedicalSummary = reference.MedicalSummary,
				VitalSigns = reference.VitalSigns,
				ObGyn = reference.ObGyn,
				PhysicalExamination = reference.PhysicalExamination,
				ComplementaryExams = reference.ComplementaryExams,
				DiagnosticImpression = reference.DiagnosticImpression,
				Observations = reference.Observations,
				Risk = reference.Risk,
				AttentionRequired = reference.AttentionRequired,
				MadeBy = reference.MadeBy,
				Companion = reference.Companion,
				Relationship = reference.Relationship,
				Address = reference.Address,
				Phone = reference.Phone,
				ContactedHf = reference.ContactedHf,
				ContactId = reference.ContactId,
				Date = reference.Date,
				OriginHF = newOriginHF,
				DestinationHF = newDestinationHF
			};

            await _referenceRepository.Add(newReference);
        }

        public async Task Update(int id, Reference reference)
        {
            var newOriginHF = await _hospitalRepository.FindById(reference.OriginHfId);
            var newDestinationHF = await _hospitalRepository.FindById(reference.DestinationHfId);

            var updateReference = await _referenceRepository.FindById(id);
			updateReference.Type = reference.Type;
			updateReference.PatientId = reference.PatientId;
			updateReference.Motive = reference.Motive;
			updateReference.Institution = reference.Institution;
			updateReference.DescriptionMotive = reference.DescriptionMotive;
			updateReference.Symptoms = reference.Symptoms;
			updateReference.MedicalSummary = reference.MedicalSummary;
			updateReference.VitalSigns = reference.VitalSigns;
			updateReference.ObGyn = reference.ObGyn;
			updateReference.PhysicalExamination = reference.PhysicalExamination;
			updateReference.ComplementaryExams = reference.ComplementaryExams;
			updateReference.DiagnosticImpression = reference.DiagnosticImpression;
			updateReference.Observations = reference.Observations;
			updateReference.Risk = reference.Risk;
			updateReference.AttentionRequired = reference.AttentionRequired;
			updateReference.MadeBy = reference.MadeBy;
			updateReference.ContactedHf = reference.ContactedHf;
			updateReference.ContactId = reference.ContactId;
			updateReference.Date = reference.Date;
				updateReference.Companion = reference.Companion;
				updateReference.Relationship = reference.Relationship;
				updateReference.Address = reference.Address;
				updateReference.Phone = reference.Phone;
			updateReference.OriginHF = newOriginHF;
			updateReference.DestinationHF = newDestinationHF;


			await _referenceRepository.Update(updateReference);
        }
    }
}
