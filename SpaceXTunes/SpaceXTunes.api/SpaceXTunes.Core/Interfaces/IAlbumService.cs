using SpaceXTunes.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SpaceXTunes.Core.Interfaces
{
    public interface IAlbumService
    {
        ServiceResult<IEnumerable<Album>> GetAllAlbums();
        ServiceResult<Album> PurchasedAlbum(int id);
        ServiceResult<Album> PurchasedSong(int idAlbum, int idSong);
        ServiceResult<Album> GetById(int id);
        ServiceResult<IEnumerable<Album>> GetAlbumByPopularity();
        ServiceResult<Album> SetRating(int albumid, int rating);
        ServiceResult<int> GetAlbumDuration(int id);
        ServiceResult<IEnumerable<Album>> GetPerfil();
    }
}
