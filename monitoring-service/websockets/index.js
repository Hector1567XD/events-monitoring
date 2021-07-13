import ws                                 from 'ws';
import { v4 as uuidv4 }                   from 'uuid';
import { socketClients, keywordsActives } from '../stores/index.js';
import crypto                             from 'crypto';
import { safeParseJSON }                  from '../helpers/index.js';
import Methods                            from './methods.js';
//crypto = await import('crypto');

// Based on https://github.com/itsUnsmart/express-ws-boiler/blob/master/sockets/index.js

// Servidor de Websockets
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', client => {

  // Generamos un identificador y un token secreto para el cliente
  const clientId          = uuidv4();
  const clientSecret      = crypto.randomBytes(48).toString('hex');

  // Agregamos al cliente
  client.id               = clientId;
  client.secret           = clientSecret;
  socketClients[clientId] = client;

  // Lo anunciamos en consola
  console.log('El cliente '+client.id+' ahora esta escuchando el servicio.');

  // Le enviamos al nuevo cliente su ID y Token Secreto
  client.send(JSON.stringify({ method: 'credentials', clientId, clientSecret }));

  // Cuando el cliente nos envia un mensaje...
  client.on('message', message => {

    const data = safeParseJSON(message);

    if (data === null) {
      client.send(JSON.stringify(
          { successful: false, method: 'notification', message: "El mensaje enviado es invalido." }
      ));
    } else if (typeof data.method === 'string' && Methods[data.method]) {
      Methods[data.method](wsServer, client, data)
    } else {
      client.send(JSON.stringify(
          { successful: false, method: 'notification', message: "El metodo solicitado no existe." }
      ));
    }

  });

});

export default wsServer;
