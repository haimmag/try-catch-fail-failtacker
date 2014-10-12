using Conduit.Mobile.ControlPanelV2.External.Domain;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure
{
	public interface ICurrentUser
	{
		ApplicationUser User { get; } 
	}
}