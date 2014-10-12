using StructureMap.Configuration.DSL;
using StructureMap.Graph;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
	public class ControllerRegistry : Registry
	{
		public ControllerRegistry()
		{
			Scan(scan =>
			{
				scan.TheCallingAssembly();
				scan.With(new ControllerConvention());
			});
		}
	}
}