using SpaceXTunes.Core.Entities;
using SpaceXTunes.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SpaceXTunes.Core.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IRepository<Album> _albumRepository;
        private readonly IRepository<Song> _songRepository;

        public AlbumService(IRepository<Album> albumRepository, IRepository<Song> songRepository)
        {
            _albumRepository = albumRepository;
            _songRepository = songRepository;
        }

        public ServiceResult<int> GetAlbumDuration(int id)
        {
            var albumS = _albumRepository.GetSongsByAlbum().FirstOrDefault(x => x.Id == id);
            int durationS = 0 ;
            foreach (var z in albumS.songs)
            {
                if (z.albumId == albumS.Id)
                {
                    if (z.state == true)
                    {
                        durationS = durationS + z.duration;
                    }
                }
            }
            return ServiceResult<int>.SuccessResult(durationS);
        }

        public ServiceResult<IEnumerable<Album>> GetAllAlbums()
        {
            var albumlist = _albumRepository.GetAll();
            foreach (var z in albumlist)
            {
                float albumPriceBySongPrice = 0;
                var albumSong = _albumRepository.GetSongsByAlbum().FirstOrDefault(x => x.Id == z.Id);
                foreach (var s in albumSong.songs)
                {
                    albumPriceBySongPrice = albumPriceBySongPrice + s.price;
                    
                }

                albumPriceBySongPrice = (float)Math.Round(Convert.ToDecimal(albumSong.songs.Sum(x => x.price) - 0.10), 2);
                z.price = albumPriceBySongPrice;
                _albumRepository.Update(z);
            }
            return ServiceResult<IEnumerable<Album>>.SuccessResult(albumlist);
        }

        public ServiceResult<Album> GetById(int id)
        {
            float total = 0;
            var albumid = _albumRepository.GetSongsByAlbum().FirstOrDefault(x => x.Id == id);
            foreach (var z in albumid.songs)
            {
                total = total + z.price;
            }
            total = (float)Math.Round(Convert.ToDecimal(albumid.songs.Sum(x => x.price) - 0.10), 2);
            albumid.price = total;
                return ServiceResult<Album>.SuccessResult(albumid);
        }

        public ServiceResult<IEnumerable<Album>> GetAlbumByPopularity()
        {
            var album = _albumRepository.GetSongsByAlbum().Select(x => x.Id);
            var albumsong = _albumRepository.GetSongsByAlbum().Where(x => album.Contains(x.Id));
            var albumlist = albumsong.ToList().Select(d => new Album
            {
                Id = d.Id,
                albumName = d.albumName,
                artistName = d.artistName,
                state = d.state,
                img = d.img,
                songs = d.songs,
                price = (float)Math.Round(Convert.ToDecimal(d.songs.Sum(x => x.price) - 0.10), 2),
                genres = d.genres,
                description = d.description,
                releaseDate = d.releaseDate,
                popularity = d.popularity
            });

            var popularitylist = albumlist.OrderByDescending(x => x.popularity).Take(10);

            return ServiceResult<IEnumerable<Album>>.SuccessResult(popularitylist);
        }

        public ServiceResult<Album> PurchasedAlbum(int id)
        {
            var albumS = _albumRepository.GetSongsByAlbum().FirstOrDefault(gg => gg.Id == id);
            albumS.state = true;

            foreach (var z in albumS.songs)
            {
                if( z.albumId == albumS.Id)
                {
                    z.state = true;
                }
            }
            _albumRepository.Update(albumS);
            if (albumS == null)
                return ServiceResult<Album>.NotFoundResult($"Error ");
            else
                return ServiceResult<Album>.SuccessResult(albumS);

        }

        public ServiceResult<Album> SetRating(int albumid, int rating)
        {
            var album = _albumRepository.GetAll().FirstOrDefault(gg => gg.Id == albumid);
            album.rating = rating;

            if (album == null)
                return ServiceResult<Album>.NotFoundResult($"Error ");
            else
            {
                _albumRepository.Update(album);
                return ServiceResult<Album>.SuccessResult(album);
            }
        }

        public ServiceResult<Album> PurchasedSong(int idAlbum, int idSong)
        {
            var albumS = _albumRepository.GetSongsByAlbum().FirstOrDefault(gg => gg.Id == idAlbum);
            int songpurchased = 1;
            foreach (var z in albumS.songs)
            {
                if(z.state == true)
                {
                    songpurchased = songpurchased + 1;
                }
                if (z.albumId == albumS.Id)
                {
                    var c = albumS.songs.Count();
                    if(z.Id == idSong)
                    {
                        z.state = true;
                        if(c == 1)
                        {
                            albumS.state = true;
                        }
                    }
                }
            }
            if(songpurchased == albumS.songs.Count())
            {
                albumS.state = true;
            }

            if (albumS == null)
                return ServiceResult<Album>.NotFoundResult($"Error ");
            else
            {
                _albumRepository.Update(albumS);
                return ServiceResult<Album>.SuccessResult(albumS);
            }
        }

        public ServiceResult<IEnumerable<Album>> GetPerfil()
        {
            var albumS = _albumRepository.GetSongsByAlbum();
            List<Album> perfillist = new List<Album>();
            

            foreach (var lista in albumS)
            {
                float totalprice = 0;
                if (lista.state == true)
                {
                    List<Song> songbought = new List<Song>();
                    foreach (var lists in lista.songs)
                    {
                        if (lists.state == true)
                        {
                            totalprice = totalprice + lists.price;
                            songbought.Add(lists);
                        }
                    }
                    lista.price = totalprice;
                    lista.songs = songbought;
                    perfillist.Add(lista);
                }
                else
                {
                    
                    List<Song> songbought = new List<Song>();
                    foreach (var lists in lista.songs)
                    {
                        if (lists.state == true)
                        {
                            totalprice = totalprice + lists.price;
                            songbought.Add(lists);
                        }
                    }
                    lista.songs = songbought;
                    if(songbought.Count() > 0)
                    {
                        lista.price = totalprice;
                        perfillist.Add(lista);
                    }
                }
            }

            return ServiceResult<IEnumerable<Album>>.SuccessResult(perfillist);
        }
    }
}
