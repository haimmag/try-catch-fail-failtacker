using Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Code.MessageBus
{
    public class LogoutHandler : IHandle<string>
    {
        public LogoutHandler()
        {
        }

        public void Handle(string message)
        {
            Console.Write("bus:" + message);
        }
    }
}