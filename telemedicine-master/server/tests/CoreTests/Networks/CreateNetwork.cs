using System.Threading.Tasks;
using Core.Networks;
using Domain.Aggregates.Networks;
using Moq;
using Xunit;

namespace CoreTests.Networks
{
    public class CreateNetwork
    {
        private readonly Mock<INetworkRepository> _mockNetworkRepository;

        public CreateNetwork()
        {
            _mockNetworkRepository = new Mock<INetworkRepository>();
        }

        [Fact]
        public async Task Create_Network_CallsRepository()
        {
            var stubNetwork = new Network
            {
                Name = "El Progreso"
            };

            var fakeNetworkService = new NetworkService(_mockNetworkRepository.Object);

            await fakeNetworkService.Create(stubNetwork);

            _mockNetworkRepository.Verify(network => network.Add(stubNetwork), Times.Once);
        }
    }
}