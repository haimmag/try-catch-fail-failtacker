using System.Web;
using System.Web.Optimization;

namespace Conduit.Mobile.ControlPanelV2.External
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/libs.js").Include(
                                    "~/Scripts/libs/jquery.min.js",
                                    "~/Scripts/libs/foundation.min.js",
                                    "~/Scripts/libs/moment.min.js",                                                                        
                                    "~/Scripts/libs/angular.min.js",                                                                                                           
                                    "~/Scripts/libs/underscore-min.js",
                                    "~/Scripts/libs/string.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularjslibs.js").Include(
                                    "~/Scripts/libs/angular-equalizer.js",
                                    "~/Scripts/libs/angular-animate.min.js",
                                    "~/Scripts/libs/infiniteScroll.js",                                    
                                    "~/Scripts/libs/angular-sticky.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularjstimeline.js")                
                .IncludeDirectory("~/app", "*.mdl.js", true)
                .IncludeDirectory("~/app", "*.drv.js", true)
                .IncludeDirectory("~/app", "*.anim.js", true)
                .IncludeDirectory("~/app", "*.srv.js", true)
                .IncludeDirectory("~/app", "*.ctrl.js", true));

            bundles.Add(new StyleBundle("~/Content/css.css").Include(
                      "~/Content/normalize.css",
                      "~/Content/fonts.css",
                      "~/Content/foundation.css",
                      "~/Content/timeline/site.css"));

            //BundleTable.EnableOptimizations = false;
        }
    }
}
