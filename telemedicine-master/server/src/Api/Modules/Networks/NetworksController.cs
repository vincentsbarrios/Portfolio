using System.Linq;
using System.Threading.Tasks;
using Core.Networks;
using Domain.Aggregates.Networks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Networks
{
    [ApiController]
    [Route("[controller]")]
    public class NetworksController : Controller
    {
        private readonly INetworkService _networkService;

        public NetworksController(INetworkService networkService)
        {
            _networkService = networkService;
        }


        [HttpGet("{id:int?}")]
        public async Task<IActionResult> Get(int? id, [FromQuery] string name)
        {
            var data = (await _networkService.All(id, name))
                .Select(network => new NetworkViewModel
                {
                    Id = network.Id,
                    Name = network.Name,
                });

            return Ok(data);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _networkService.Remove(id);
                return Ok();
            }
            catch (NetworkIsBeingUsedException e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpPost]
        public async Task Post(NetworkViewModel projectViewModel)
        {
            var network = new Network
            {
                Name = projectViewModel.Name,
            };

            await _networkService.Create(network);
        }

        [HttpPut("{id:int}")]
        public async Task Put(int id, [FromBody] NetworkViewModel projectViewModel)
        {
            var network = new Network
            {
                Id = projectViewModel.Id,
                Name = projectViewModel.Name,
            };
            await _networkService.Update(id, network);
        }
    }
}