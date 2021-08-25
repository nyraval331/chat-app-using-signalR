using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FuseChatify.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FuseChatify.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
        
    }
}