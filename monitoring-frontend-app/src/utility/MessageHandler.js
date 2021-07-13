import store from '../store'
import { callConfig } from '../index';
import { setAuthorizationConnection } from '../features/connection/connection-slice'
import { eventAdd, multipleEventsAdd } from '../features/events/events-slice'

/** Esta clase se encargara de recibir y manejar todos los mensajes en sockets
  * provenientes del servicio de monitoreo
  */
const MessageHandler = (message) => {

  let data = JSON.parse(message.data)

  switch (data.method) {
    case 'notification':
      /* { successful, method: 'notification', message } */
      console.log('Nueva notificacion!', data);
      callConfig.call.useToasts.addToast(data.message, {
        appearance: (data.successful) ? 'success' : 'error'
      });
    break;
    case 'new-event':
      /* { method: 'new-event',            data: event   } */
      store.dispatch(eventAdd(data.data));
    break;
    case 'new-subscribe-events':
      /* { method: 'new-subscribe-events', data: events  } */
      store.dispatch(multipleEventsAdd(data.data));
    break;
    case 'credentials':
      /* {method: 'credentials', data: { clientId, clientSecret } } */
      store.dispatch(
        setAuthorizationConnection(data.clientId, data.clientSecret)
      );
    break;
    default:
      console.log('Metodo indefinido ', data);
  }

}

export default MessageHandler;
