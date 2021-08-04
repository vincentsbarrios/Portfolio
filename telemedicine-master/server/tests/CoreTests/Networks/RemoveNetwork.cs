using System.Threading.Tasks;
using Domain.Aggregates.Networks;
using Moq;

namespace CoreTests.Networks
{
    public class RemoveNetwork
    {
        private readonly Mock<INetworkRepository> _mockNetworkRepository;

        public RemoveNetwork()
        {
            _mockNetworkRepository = _mockNetworkRepository;
        }

        public async Task Remove_Entity_CallsDisable()
        {
            
        }
    }
}