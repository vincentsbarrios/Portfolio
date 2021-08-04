using SpaceXTunes.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceXTunes.api.Models
{
    public class AlbumDto
    {
        public int id { get; set; }
        public string albumName { get; set; }
        public string artistName { get; set; }
        public float price { get; set; }
        public int number { get; set; }
        public string img { get; set; }
        public Song songs { get; set; }
        public string genres { get; set; }
        public int rating { get; set; }
        public string releaseDate { get; set; }
        public string description { get; set; }
        public bool state { get; set; }
        public int popularity { get; set; }
    }
}
