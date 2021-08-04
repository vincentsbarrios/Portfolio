using SpaceXTunes.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SpaceXTunes.Core.Interfaces
{
    public interface ISongService
    {
        ServiceResult<IEnumerable<Song>> GetAllSongs();
        ServiceResult<IEnumerable<Song>> PurchasedSongs();
        ServiceResult<Song> Purchased(int id);
    }
}
