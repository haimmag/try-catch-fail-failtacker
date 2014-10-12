using AutoMapper;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Mapping
{
	public interface IHaveCustomMappings
	{
		void CreateMappings(IConfiguration configuration);
	}
}