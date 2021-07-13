// React
import React, { useEffect } from "react"
// Bootstrap
import { Container, Row, Col }    from 'react-bootstrap'
// Componentes
import EventsMap              from './features/events/EventsMap'
import SubscriptionsComponent from './features/subscriptions/SubscriptionsComponent'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { attempSubscribeKeyword }   from './features/subscriptions/subscriptions-slice'
import { selectMarkers }   from './features/events/events-slice'
import { setConnectionEstablished, setConnectionLose }   from './features/connection/connection-slice'
// Websockets
import MessageHandler from './utility/MessageHandler'
// Configuracion
import configServices from './config/services.js';

// Toasts
import { useToasts } from 'react-toast-notifications'


// Inicia la conexion
const firstClient  = new WebSocket(configServices.ws_url_connection);

/* Smart Component */
function App() {

  // Usar el selector de markers
  const markers             = useSelector(selectMarkers)
  // Selector de subscripciones
  const subscriptions       = useSelector(state => state.subscriptions)
  // Selector de connection
  const connection          = useSelector(state => state.connection)

  // Toasts Hook
  const { addToast } = useToasts();

  // Dispatch
  const dispatch            = useDispatch()

  const createSubscription  = ( keyword, passEvents ) => {
    dispatch( attempSubscribeKeyword( keyword, passEvents ) )
  };

  // ComponentDidMounted
  useEffect(()    => {

    const openEventListener = (client) => {
      console.log('[Socket] El cliente websocket esta conectado 🏁!')
      addToast('Te haz conectado al servicio de monitoreo 🏁!', { appearance: 'success' })
      dispatch(setConnectionEstablished(client))
    }
    const newConnection = (client = null) => {
      console.log("[Socket] Se esta intentando establecer una nueva conexion!")

      if (!client) client = new WebSocket(configServices.ws_url_connection)
      client.addEventListener('open',       () => openEventListener(client))
      client.addEventListener('message',    MessageHandler)
      client.addEventListener('close',      closeSocket)
    }
    const closeSocket = (event) => {
      console.log("[Socket] El socket se ha desconectado!.")

      addToast('Se ha perdido la conexion con el servicio de monitoreo', { appearance: 'error' })
      dispatch(setConnectionLose())
      setTimeout(() => {
        console.log("[Socket] Reintentando conexion...")
        addToast('Reintentando conectar al servicio de monitoreo...', { appearance: 'info' })
        newConnection()
      }, 5000)
    }
    newConnection(firstClient)

  // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Container fluid>
        { (!connection.disconnected) ?
          <Row>
            <Col lg={3}>
              <SubscriptionsComponent
                subscriptions={ subscriptions }
                onCreate={ createSubscription }
              />
            </Col>
            <Col lg={9}>
              <EventsMap markers={ markers } />
            </Col>
          </Row>
           : <div>Conectandose al servicio...</div> }
      </Container>
    </div>
  );

}

export default App;
