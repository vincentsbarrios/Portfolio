using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Aggregates.Networks;
using Microsoft.EntityFrameworkCore;

namespace Core.Networks
{
    public class NetworkService : INetworkService
    {
        private readonly INetworkRepository _networkRepository;

        public NetworkService(INetworkRepository networkRepository)
        {
            _networkRepository = networkRepository;
        }


        public async Task<Network> FindById(int id)
        {
            return await _networkRepository.FindById(id);
        }

        public async Task<IEnumerable<Network>> All(int? id, string name)
        {
            return await _networkRepository
                .Filter(patient => !patient.Disabled)
                .Where(x => id == null || x.Id == id)
                .Where(x => name == null || x.Name == name)
                .ToListAsync();
        }

        public async Task Remove(int id)
        {
            var network = await _networkRepository.All().Include(x => x.Hospitals).FirstOrDefaultAsync(x => x.Id == id);
            var hospitals = network.Hospitals.Where(x => !x.Disabled);
            

            if (hospitals.Count() > 0 )
            {
                throw new NetworkIsBeingUsedException();
            }

            await _networkRepository.Disable(network);
        }

        public async Task Update(int id, Network network)
        {
            var updateNetwork = await _networkRepository.FindById(id);
            updateNetwork.Name = network.Name;
            await _networkRepository.Update(updateNetwork);
        }

        public async Task Create(Network network)
        {
            await _networkRepository.Add(network);
        }
    }
}