using System;
using System.Collections.Generic;
using System.Text;

namespace SpaceXTunes.Core.Entities
{
    public class Song : BaseEntity
    {
        public int albumId { get; set; }
        public string name { get; set; }
        public string artist { get; set; }
        public float price { get; set; }
        public int duration { get; set; }
        public int rating { get; set; }
        public bool state { get; set; }
    }
}
