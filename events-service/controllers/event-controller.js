// Servicios
import EventService from '../services/event-service.js';
import MonitoringService from '../services/monitoring-service.js';
import { errorResponseHandler } from '../helpers/handlers.js';
import isValidCoordinates from 'is-valid-coordinates';

// Funcion para crear un nuevo evento
const store = (req, res) => {

  // Si no se ha enviado alguna de las coordenadas, error
  if (!req.body.lng || !req.body.lat)
    return res.status(400).send('Debe enviar coordenadas!');

  // Coordenadas en formato numerico
  req.body.lng = Number(req.body.lng)
  req.body.lat = Number(req.body.lat)

  // Valida que las cordenadas enviadas sean validas
  if (!isValidCoordinates(req.body.lng, req.body.lat)) {
    return res.status(400).send('Coordenadas invalidas!');
  }

  // Se formatean los datos del frontend
  const newEvent = {
    description:    req.body.description,
    location:      {
      type:        'Point',
      coordinates: [req.body.lat,  req.body.lng]
    }
  };

  EventService.create(newEvent)
  .then(event => {
    // 1. Crea el evento con exito, entonces envia una respuesta
    res.status(200).json(event);
    return event;
  })
  .then(async (event) => {
    // 2. Posterior a enviar la respuesta, notifica al servicio de monitoreo
    const response = await MonitoringService.notifyNewEvent(event);
  })
    // 3. Si hubo un error, lo maneja y si puede lo devuelve al frontend
  .catch(e => errorResponseHandler(e, req, res));

}

// Listar eventos
const index = (req, res) => {

  if (req.query.filter_keyword) {
    // Si se ha enviado el filtro de palabra clave
    return EventService.getEventsByKeyword(req.query.filter_keyword)
    .then (events => res.json(events))
    .catch(e => errorResponseHandler(e, req, res))
  }

  // Si no se ha enviado ningun filtro ni condicion, buscar todos los eventos
  EventService.getAll()
  .then (events => res.json(events))
  .catch(e => errorResponseHandler(e, req, res))

}

// Borrar eventos
const clear = (req, res) => {
  EventService.deleteAll()
  .then (events => res.send('Todos los eventos borrados con exito!'))
  .catch(e => errorResponseHandler(e, req, res))
}

export default {
  store,
  index,
  clear
}
