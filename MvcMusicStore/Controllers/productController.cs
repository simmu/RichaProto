using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcMusicStore.Controllers
{
    public class productController : Controller
    {
        //
        // GET: /product/

        public ActionResult Index()
        {
            return View();
        }

    }
}
