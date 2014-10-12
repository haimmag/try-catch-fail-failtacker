using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Conduit.Mobile.ControlPanelV2.External.Startup))]
namespace Conduit.Mobile.ControlPanelV2.External
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
