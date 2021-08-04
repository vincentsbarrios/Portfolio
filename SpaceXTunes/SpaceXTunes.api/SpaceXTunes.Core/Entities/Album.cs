using System;
using System.Collections.Generic;
using System.Text;

namespace SpaceXTunes.Core.Entities
{
    public class Album : BaseEntity
    {
        public string albumName { get; set; }
        public string artistName { get; set; }
        public float price { get; set; }
        public string img { get; set; }
        public ICollection<Song> songs { get; set; }
        public string genres { get; set; }
        public int rating { get; set; }
        public string releaseDate { get; set; }
        public string description { get; set; }
        public bool state { get; set; }
        public int popularity { get; set; }
    }
}
