using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaceXTunes.api.Models;
using SpaceXTunes.Core.Entities;
using SpaceXTunes.Core.Enums;
using SpaceXTunes.Core.Interfaces;
using SpaceXTunes.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceXTunes.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumservice;
        private readonly ISongService _songservice;
        private readonly TunesDbContext _tunesdbcontext;
        public AlbumController(IAlbumService albumservice, ISongService songservice, TunesDbContext tunesdbcontext)
        {
            _albumservice = albumservice;
            _songservice = songservice;
            _tunesdbcontext = tunesdbcontext;
        }

        [HttpGet]
        [Route("album")]
        public ActionResult<IEnumerable<AlbumDto>> Get()
        {
            var resultcall = _albumservice.GetAllAlbums();
            var resultcallS = _songservice.GetAllSongs();

            if(resultcall.ResponseCode != ResponseCode.Success)
            {
                return BadRequest(resultcall.Error);
            }

            var allalbums = resultcall.Result;

            return Ok(allalbums.Select(f => new AlbumDto
            {
                id = f.Id,
                albumName = f.albumName,
                artistName = f.artistName,
                price = f.price,
                description = f.description,
                img = f.img,
                rating = f.rating,
                genres = f.genres,
                releaseDate = f.releaseDate,
                state = f.state,
                popularity = f.popularity

            }));
        }

        [HttpGet]
        [Route("album/detail/{albumId}")]
        public ActionResult<Album> GetAlbumById(int albumId)
        {
            var resultS = _albumservice.GetById(albumId);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);
        }

        [HttpPost]
        [Route("album/detail/{albumid}/rating")]
        public ActionResult<IEnumerable<Album>> setRating(int albumid, [FromBody] int rate)
        {

            var resultS = _albumservice.SetRating(albumid, rate);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);

        }

        [HttpPost]
        [Route("album/detail/{albumid}/buy")]
        public ActionResult<IEnumerable<Album>> BuyAlbum(int albumid)
        {

            var resultS = _albumservice.PurchasedAlbum(albumid);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);

        }

        [HttpGet]
        [Route("album/detail/{albumid}/duration")]
        public ActionResult<IEnumerable<Album>> GetAlbumDurationSongs(int albumid)
        {

            var resultS = _albumservice.GetAlbumDuration(albumid);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);

        }

        [HttpPost]
        [Route("album/detail/{albumid}/song/{songid}")]
        public ActionResult<IEnumerable<Album>> purchasedSong(int albumid, int songid)
        {

            var resultS = _albumservice.PurchasedSong( albumid, songid);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);

        }

        [HttpGet]
        [Route("album/popularity")]
        public ActionResult<IEnumerable<Album>> GetAlbumPopularity()
        {

            var resultS = _albumservice.GetAlbumByPopularity();
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);

        }

        [HttpGet]
        [Route("album/perfil")]
        public ActionResult<IEnumerable<Album>> GetPerfilList()
        {

            var resultS = _albumservice.GetPerfil();
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);

        }
    }
}
