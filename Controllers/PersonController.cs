using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{

    [ApiController]
    [Route("api/persons")]
    public class PersonController : ControllerBase
    {
        [HttpPost]
        public void Create([FromBody] PersonDto person) { }
    }
}
