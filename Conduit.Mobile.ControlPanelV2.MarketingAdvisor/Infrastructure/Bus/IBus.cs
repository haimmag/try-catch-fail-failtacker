using System;
namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus
{
    public interface IBus
    {
        TReply RequestReply<TRequest, TReply>(TRequest request);
        void Send<TMessage>(TMessage message);
    }
}
