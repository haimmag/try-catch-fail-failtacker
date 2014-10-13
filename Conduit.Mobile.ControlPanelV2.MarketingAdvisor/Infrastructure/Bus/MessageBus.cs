using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Conduit.Mobile.ControlPanelV2.External.Infrastructure.Bus
{
    public class MessageBus : IBus
    {
        private readonly IMessageHandlerRegistry _registry;

        public MessageBus(IMessageHandlerRegistry registry)
        {
            _registry = registry;
        }

        public void Send<TMessage>(TMessage message)
        {
            var handler = _registry.GetHandlerFor<TMessage>();

            if (handler == null)
            {
                throw new HandlerNotFoundException(typeof(TMessage));
            }

            handler.Handle(message);
        }

        public TReply RequestReply<TRequest, TReply>(TRequest request)
        {
            var handler = _registry.GetHandlerFor<TRequest, TReply>();

            if (handler == null)
            {
                throw new HandlerNotFoundException(typeof(TRequest), typeof(TReply));
            }

            return handler.Handle(request);
        }
    }
}