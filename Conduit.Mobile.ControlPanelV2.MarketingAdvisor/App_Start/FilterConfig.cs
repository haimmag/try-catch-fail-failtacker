using System.Web;
using System.Web.Mvc;

namespace Conduit.Mobile.ControlPanelV2.External
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
