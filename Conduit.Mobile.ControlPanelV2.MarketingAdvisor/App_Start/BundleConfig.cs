using System.Web;
using System.Web.Optimization;
using Conduit.Mobile.ControlPanelV2.External.Infrastructure;

namespace Conduit.Mobile.ControlPanelV2.External
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            "~/Scripts/modernizr-*"));

            var libsBundle = new ScriptBundle("~/bundles/libs.js").Include(
                                    "~/Scripts/libs/jquery.min.js",
                                    "~/Scripts/libs/jquery-ui-1.10.1.custom.js",
                                    "~/Scripts/libs/jquery.nicescroll.js",                                    
                                    "~/Scripts/libs/foundation.min.js",
                                    "~/Scripts/libs/moment.min.js",
                                    "~/Scripts/libs/angularjs_1_3/angular.min.js",
                                    "~/Scripts/libs/angular-get-watchers.js",
                                    "~/Scripts/libs/underscore-min.js",
                                    "~/Scripts/libs/string.js");
            libsBundle.Orderer = new NonOrderingBundleOrderer();
            bundles.Add(libsBundle);

            bundles.Add(new ScriptBundle("~/bundles/angularjslibs.js").Include(
                                    "~/Scripts/libs/angular-equalizer.js",
                                    "~/Scripts/libs/angular-validation.js",
                                    "~/Scripts/libs/angular-ui-date-picker.js",
                                    "~/Scripts/libs/angularjs_1_3/angular-animate.min.js",
                                    "~/Scripts/libs/infiniteScroll.js",                                    
                                    "~/Scripts/libs/angular-sticky.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularjstimeline.js")                
                .IncludeDirectory("~/app", "*.mdl.js", true)
                .IncludeDirectory("~/app", "*.drv.js", true)
                .IncludeDirectory("~/app", "*.anim.js", true)
                .IncludeDirectory("~/app", "*.srv.js", true)
                .IncludeDirectory("~/app", "*.ctrl.js", true));

            var cssBundle = new StyleBundle("~/Content/css.css").Include(
                      "~/Content/normalize.css",
                      "~/Content/fonts.css",
                      "~/Content/foundation.css",
                      "~/Content/jquery-ui-1.10.1.custom.css",
                      //"~/Content/animate.css",                      
                      "~/Content/timeline/site.css");
            cssBundle.Orderer = new NonOrderingBundleOrderer();
            bundles.Add(cssBundle);

            //BundleTable.EnableOptimizations = false;
        }
    }
}
