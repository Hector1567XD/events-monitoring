const initialState = {
  // Instancia del websocket
  ws:             null,
  // ¿Se encuentra desconectado?
  disconnected:   true,
  // Credenciales de authorizacion
  authorization: {
    id:     null,
    secret: null
  }
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        // El estado cambia a una conexion establecida a un websocket dado
        case 'connection/connectionEstablished': {
            return { ...state, ws: action.payload, disconnected: false };
        }
        // Se establece en el estado los datos de authorizacion de un cliente-websocket
        case 'connection/setAuthorizationData': {
            return {   ...state,
                       authorization: {
                         ...state.authorization,
                         id:      action.payload.id,
                         secret:  action.payload.secret
                       }
                  };
        }
        // Se establece en el estado que se ha perdido la conexion
        case 'connection/connectionLose': {
            return { ...state, ws: null, disconnected: true, authorization: { id: null, secret: null } };
        }
        default:
            return state
    }
}

// = ACTION CREATORS =

// Nueva conexion establecida
export const setConnectionEstablished = client => {
  // client.send(JSON.stringify({ method: 'testing' })) // TODO: a Middleware si se descomenta
  return {
    type: 'connection/connectionEstablished',
    payload: client
  }
}
// Establecer las credenciales de authorizacion de una nueva conexion
export const setAuthorizationConnection = (id, secret) => {
  return {
    type: 'connection/setAuthorizationData',
    payload: { id, secret }
  }
}
// Establecer la conexion como perdida
export const setConnectionLose = () => {
  return {
    type: 'connection/connectionLose',
    payload: null
  }
}
