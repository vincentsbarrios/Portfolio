using System.Threading.Tasks;
using Core.Networks;
using Domain.Aggregates.Networks;
using Moq;
using Xunit;

namespace CoreTests.Networks
{
    public class UpdateService
    {
        private readonly Mock<INetworkRepository> _mockNetworkRepository;

        public UpdateService()
        {
            _mockNetworkRepository = new Mock<INetworkRepository>();
        }

        [Fact]
        public async Task Update_Network_CallsRepository()
        {
            const int id = 1;

            var stubNetwork = new Network
            {
                Id = 1,
                Name = "El Progreso"
            };

            _mockNetworkRepository
                .Setup(m => m.FindById(It.Is<int>(x => x == id)))
                .ReturnsAsync(stubNetwork);

            var fakeNetworkService = new NetworkService(_mockNetworkRepository.Object);

            await fakeNetworkService.Update(id, stubNetwork);

            _mockNetworkRepository.Verify(network => network.Update(stubNetwork), Times.Once);
        }
    }
}