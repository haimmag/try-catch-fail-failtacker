using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus
{
    public interface IHandle<TMessage, TReplay>
    {
        TReplay Handle(TMessage request);
    }

    public interface IHandle<TMessage>
    {
        void Handle(TMessage message);
    }
}
