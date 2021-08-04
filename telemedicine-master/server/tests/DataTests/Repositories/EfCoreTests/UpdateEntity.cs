using System.Threading.Tasks;
using DataTests.Helpers;
using FluentAssertions;
using Xunit;

namespace DataTests.Repositories.EfCoreTests
{
    public class UpdateEntity : InMemoryDatabaseContextFixture
    {
        [Fact]
        public async Task Update_Entity_ModifiesTheInformation()
        {
            var fakeTestRepository = new TestRepository(TestContext);

            var stubEntity = new TestEntity("Example");
            await fakeTestRepository.Add(stubEntity);

            stubEntity.Name = "123";
            await fakeTestRepository.Update(stubEntity);
            var expectedEntity = await fakeTestRepository.FirstOrDefault(c => c.Id == stubEntity.Id);

            expectedEntity
                .Should()
                .BeEquivalentTo(stubEntity);
        }
    }
}