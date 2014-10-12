using StructureMap.Configuration.DSL;
using StructureMap.Graph;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
	public class StandardRegistry : Registry
	{
		public StandardRegistry()
		{
			Scan(scan =>
			{
				scan.TheCallingAssembly();
				scan.WithDefaultConventions();
			});
		}
	}
}