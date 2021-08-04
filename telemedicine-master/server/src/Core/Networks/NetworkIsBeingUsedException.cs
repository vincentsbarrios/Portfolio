using System;

namespace Core.Networks
{
    public class NetworkIsBeingUsedException : Exception
    {
        public NetworkIsBeingUsedException() : base("The network is being used by a hospital")
        {
        }
    }
}