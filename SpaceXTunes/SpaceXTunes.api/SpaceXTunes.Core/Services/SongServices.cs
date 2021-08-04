using SpaceXTunes.Core.Entities;
using SpaceXTunes.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SpaceXTunes.Core.Services
{
    public class SongServices : ISongService
    {
        private readonly IRepository<Song> _songRepository;

        public SongServices(IRepository<Song> songRepository)
        {
            _songRepository = songRepository;
        }

        public ServiceResult<IEnumerable<Song>> GetAllSongs()
        {
            return ServiceResult<IEnumerable<Song>>.SuccessResult(_songRepository.GetAll());
        }

        public ServiceResult<Song> Purchased(int id)
        {
            throw new NotImplementedException();
        }

        public ServiceResult<IEnumerable<Song>> PurchasedSongs()
        {
            throw new NotImplementedException();
        }
    }
}
