import AxiosClient    from '../../utility/AxiosClient';
import configServices from '../../config/services.js';
import { callConfig } from '../../index';

const initialState = [/*"Robo","Asalto","Motorizados","Elefantes"*/]

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        // Agrega una nueva subscripcion de palabra
        case 'subscriptions/subscriptionAdded': {
            return [ ...state, action.payload ]
        }
        // Elimina una subscripcion de palabra (sin usar)
        case 'subscriptions/subscriptionRemove': {
            const newSubscriptions = [ ...state ];
            newSubscriptions.splice(  newSubscriptions.indexOf(action.payload), 1 );
            return newSubscriptions;
        }
        default:
            return state
    }
}

// = ACTION CREATORS =

// Agregar nueva subscripcion a una palabra clave
export const subcriptionAdd = keyword => {
  return {
    type: 'subscriptions/subscriptionAdded',
    payload: keyword
  }
}

// = MIDDLEWARES =

/**
  * @description Este middleware intenta crear una nueva subscripcion con una
  * keyword dada
  * @param {String}  keyword la palabra o cadena clave
  * @param {Boolean} passEvents (opcional) si es true, busca los eventos del
  * servidor creadores con anterioridad que coincidan con la palabra clave
  * @return {Void}
  */
export function attempSubscribeKeyword( keyword, passEvents ) {
  return async (dispatch, getState) => {

    const { connection } = getState();

    AxiosClient.post(configServices.api_url_connection+'/keyword-subscriptions', { keyword, passEvents }, {
      "x-socket-client": connection.authorization.id,
      "x-socket-secret": connection.authorization.secret,
    }).then((response) => {
      console.log('Response', response)
      dispatch(subcriptionAdd(keyword))
      callConfig.call.useToasts.addToast(response.data, { appearance: 'success' });
    }).catch((e) => {
      console.error(e)
      callConfig.call.useToasts.addToast(e.response.data, { appearance: 'error' });
    });

  }
}
