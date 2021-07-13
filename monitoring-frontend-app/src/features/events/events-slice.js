import { createSelector }           from 'reselect'

const initialState = [
        /*{
            _id: 1,
            location: {
                "coordinates": [32.00, 64.00], type: "Point"
            },
            description: "El gran elefante morado ya no podia caminar"
        }*/
      ]

/**
 * Verifica si el evento no existe en un arreglo de eventos,
 * si no existe, entonces lo agrega
 * @param {Array} events arreglo o coleccion de eventos (debe ser mutable)
 * @param {Event} event evento a agregar
 * @returns {Array}
 */
const addIfNotExists = (events, event) => {
    if (!events.find(existEvent => existEvent._id === event._id))
        events.push(event)
    return events;
}

export default function eventsReducer(state = initialState, action) {
    switch (action.type) {
        // Agrega un nuevo evento
        case 'events/eventAdded': {
            return addIfNotExists( [ ...state ], action.payload );
        }
        // Agrega multiples eventos
        case 'events/multipleEventsAdded': {
            const newEvents = [ ...state ];
            // eslint-disable-next-line
            action.payload.map((event) => {
                addIfNotExists(newEvents, event)
            })
            return newEvents;
        }
        default:
            return state
    }
}

// = ACTION CREATORS =

// Agregar evento
export const eventAdd = event => {
  return {
    type: 'events/eventAdded',
    payload: event
  }
}
// Agregar eventos
export const multipleEventsAdd = events => {
  return {
    type: 'events/multipleEventsAdded',
    payload: events
  }
}

// = SELECTORES =

/* Selector de marcadores del mapa, este selector itera el arreglo de eventos
 * y los transforma en un formato legible para el EventsMap.js, es un MEMO Selector
 **/
export const selectMarkers = createSelector(
  state   =>  state.events,
  events  =>  {
    return events.map((event) => {
        // Formato legible
        return {
          location:     { lat: event.location.coordinates[0], lng: event.location.coordinates[1] },
          id:           event._id,
          description:  event.description
        }
    })
  }
)
