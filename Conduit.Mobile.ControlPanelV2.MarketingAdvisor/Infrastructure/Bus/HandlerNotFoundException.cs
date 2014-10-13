using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus
{
    class HandlerNotFoundException : Exception
    {
        private Type message;
        private Type request;
        private Type replay;

        public HandlerNotFoundException(Type message)
        {            
            this.message = message;
        }

        public HandlerNotFoundException(Type request, Type replay)
        {
            this.request = request;
            this.replay = replay;
        }
    }
}
