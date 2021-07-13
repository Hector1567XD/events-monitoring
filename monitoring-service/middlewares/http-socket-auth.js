import { socketClients } from '../stores/index.js';

/**
  * Este middleware comprobara que se ha enviado una ID y un Token de cliente
  * para poder relacionar la peticion a un socket de cliente que previamente
  * ha establecido conexion con el servidor
  */
const httpSocketAuth = function (req, res, next) {

  const clientId      = req.headers['x-socket-client'];
  const clientSecret  = req.headers['x-socket-secret'];

  // Validamos que se hayan enviado
  if (!clientId || !clientSecret)
    return res.status(400).send('No envio datos de autenticacion correctamente.');

  // Encontramos a un socket cliente que coincida con el ID solicitado
  const socketClient = socketClients[clientId];

  /**
    * Comprobamos el token secreto de este socket-client (si existe) con el
    * enviado en la peticion*/
  if (!socketClient || socketClient.secret !== clientSecret)
    return res.status(403).send('Fallo de autenticacion.');

  // Si la autenticacion fue exitosa
  req.socketClient = socketClient;
  next();

};

export default httpSocketAuth;
