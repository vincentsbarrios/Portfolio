using GroceryStore.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GroceryStore.Core.Interfaces
{

    public interface IVoiceService
    {
        ServiceResult<Voice> getVoiceText(Voice objv);
    }
}
