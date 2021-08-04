using GroceryStore.api.Models;
using GroceryStore.Core.Entities;
using GroceryStore.Core.Enums;
using GroceryStore.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryStore.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoiceController : ControllerBase
    {
        private readonly IVoiceService _voice;
        private readonly IReminderService _remind;

        public VoiceController(IVoiceService voice, IReminderService remind)
        {
            _voice = voice;
            _remind = remind;
        }


        [HttpPost]
        [Route("send/{textdata}/{userid}")]
        public ActionResult<Voice> ReceiveText(string textdata, int userid)
        {
            Voice v = new Voice();
            v.VoiceText = textdata;
            v.UserId = userid;
            var serviceResult = _voice.getVoiceText(v);
            if (serviceResult.ResponseCode != ResponseCode.Success)
                return BadRequest(serviceResult.Error);

            return Ok(serviceResult.Result);
        }

        [HttpGet]
        [Route("reminder/{idr}")]
        public ActionResult<IEnumerable<Reminder>> Get(int idr)
        {
            var serviceResult = _remind.getReminder(idr);
            if (serviceResult.ResponseCode != ResponseCode.Success)
                return BadRequest(serviceResult.Error);
            return Ok(serviceResult.Result);
        }

        [HttpPost]
        [Route("newreminder")]
        public ActionResult<Reminder> GetVerification([FromBody] Reminder newreminder)
        {
            var resultS = _remind.addReminder(newreminder);
            if (resultS.ResponseCode != ResponseCode.Success)
                return BadRequest(resultS.Error);

            return Ok(resultS.Result);
        }
    }
}
