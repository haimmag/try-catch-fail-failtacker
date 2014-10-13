using System;
namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus
{
    public interface IMessageHandlerRegistry
    {
        IHandle<TMessage> GetHandlerFor<TMessage>();
        IHandle<TRequest, TReply> GetHandlerFor<TRequest, TReply>();
    }
}
