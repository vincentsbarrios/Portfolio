using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Hospitals;
using Core.Hospitals.Dtos;
using Core.Networks;
using Domain.Aggregates.Hospitals;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Hospitals
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalsController : Controller
    {
        private readonly IHospitalService _hospitalService;

        public HospitalsController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }


        [HttpGet("{id:int?}")]
        public async Task<ActionResult<GetHospital>> Get(int? id, [FromQuery] int? code)
        {
            var data = (await _hospitalService.All(id, code))
                .Select(hospital => new GetHospital
                {
                    Id = hospital.Id,
                    Code = hospital.Code,
                    Name = hospital.Name,
                    Address = hospital.Address,
                    Department = hospital.Department,
                    City = hospital.City,
                    Category = hospital.Category,
                    Contacts = hospital.Contacts,
                    Services = hospital.Services,
                    Network = hospital.Network.Name,
                    NetworkId = hospital.Network.Id
                });

            return Ok(data);
        }

        [HttpPost]
        public async Task Post(CreateHospital createHospital)
        {
            var hospital = new Hospital
            {
                Code = createHospital.Code,
                Name = createHospital.Name,
                Address = createHospital.Address,
                Department = createHospital.Department,
                City = createHospital.City,
                Category = createHospital.Category,
                Contacts = createHospital.Contacts,
                Services = createHospital.Services,
                NetworkId = createHospital.NetworkId
            };

            await _hospitalService.Create(hospital);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {

                await _hospitalService.Remove(id);
                return Ok();

        }

        [HttpPut("{id:int}")]
        public async Task Put(int id, [FromBody] CreateHospital updateHospital)
        {
            var hospital = new Hospital
            {
                Code = updateHospital.Code,
                Name = updateHospital.Name,
                Address = updateHospital.Address,
                Department = updateHospital.Department,
                City = updateHospital.City,
                Category = updateHospital.Category,
                Contacts = updateHospital.Contacts,
                Services = updateHospital.Services,
                NetworkId = updateHospital.NetworkId
            };

            await _hospitalService.Update(id, hospital);
        }
    }
}