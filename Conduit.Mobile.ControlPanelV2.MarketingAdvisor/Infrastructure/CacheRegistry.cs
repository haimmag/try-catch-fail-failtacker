
using System.Security.Principal;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using StructureMap.Configuration.DSL;
using StructureMap.Graph;
using Conduit.Mobile.ControlPanelV2.External.Data;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
    public class CacheRegistry : Registry
    {
        public CacheRegistry()
        {
            For<ICacheService>().Use<InMemoryCache>();
            
            //For(typeof(IFeedRepository)).DecorateAllWith(typeof(CacheFeedRepository));

            //Scan(scan =>
            //{
            //    scan.TheCallingAssembly();
            //    //scan.With(new RepositoryConvention());
            //    //x.AddAllTypesOf<ISpiceHarvester>().NameBy(type => "I" + type.Name.Split('_').Last() + "Harvester");                
            //});
        }
    }
}