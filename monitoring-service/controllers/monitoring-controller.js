import { socketClients, keywordsActives } from '../stores/index.js';
import EventService from '../services/event-service.js';

/**
 * @description Metodo para que el cliente se subscriba a una palabra clave
 */
function subscribeKeyword(req, res) {

    if (!req.body.keyword)
        return res.status(400).response('No ha especificado una palabra clave');

    const client     = req.socketClient;
    const keyword    = req.body.keyword.toLowerCase();
    const passEvents = req.body.passEvents;
    console.log('El cliente ' + client.id + ' quiere SUBSCRIBIR a la keyword "' + keyword + '" ' + ((passEvents) ? 'y DESEA obtener eventos del pasado' : 'pero NO desea obtener eventos del pasado'))

    const keywordObject = keywordsActives[keyword];
    let   successfulSubscribe = false;

    // La keyword aun no existe → se define y se agrega a este cliente como el primero
    if (!keywordObject) {
       keywordsActives[keyword] = [{ id: client.id }];
       successfulSubscribe = true;
    }

    // Si el cliente no se ha subscrito aun, y la keyword ya existe → se evalua si el cliente ya se ha subscrito anteriormente a la misma
    if (!successfulSubscribe && keywordObject.find((alreadyClient) => alreadyClient.id === client.id)) {
      // Si el cliente ya se ha subscrito previamente
        return res.status(409).send('Ya te encuentras subscrito a la palabra clave ' + keyword);
    }

     // Si el cliente aun no esta subscrito y no se ha subscrito arriba, entonces se subscribe
    if (!successfulSubscribe)
        keywordsActives[keyword] = [ ...keywordObject, { id: client.id } ];

    // Si resulta que el usuario desea obtener eventos del pasado (previos a su subscripcion)
    if (passEvents) {
      // Buscar los primeros eventos del cliente y enviarselos cuando hayan llegado
      EventService.getEventsByKeyword(req.body.keyword).then((events) => {
        client.send(JSON.stringify({
          method:     'new-subscribe-events',
          data:       events
        }));
      })
    }

    return res.status(200).send('Te haz subscrito a la palabra clave ' + keyword);

}

/**
* @description Metodo para que el cliente se des-subscriba a una palabra clave
*/
function unsubscribeKeyword(req, res) {

   if (!req.body.keyword)
      return res.status(400).response('No ha especificado una palabra clave');

   const client   = req.socketClient;
   const keyword  = req.body.keyword.toLowerCase();

   console.log('El cliente ' + client.id + ' quiere DESUSCRIBIR de la keyword ' + keyword)

   // Comprobamos que la palabra clave exista, si no es asi, devuelve error
   if (!keywordsActives[keyword])
     return res.status(404).send('No estas subscrito a esta palabra clave');

   // Recuperamos la referencia del cliente dentro de esta palabra clave
   const clientReference  = keywordsActives[keyword].find((alreadyClient) => alreadyClient.id === client.id);

   // Si resulta que no se encontro ninguna referencia, el cliente no esta subscrito
   if (!clientReference)
     return res.status(404).send('No estas subscrito a esta palabra clave');

   // Buscamos el Index de esta referencia y lo eliminamos del arreglo de referencias para esta palabra
   const clientIndex = keywordsActives[keyword].indexOf(clientReference);
   keywordsActives[keyword].splice(clientIndex, 1);

   // Si la palabra clave se quedo sin referencias, entonces la eliminamos de memoria
   if (!keywordsActives[keyword].length)
     delete keywordsActives[keyword];

   return res.status(200).send('Dejaste de estar subscrito a la palabra clave ' + keyword);

}

/**
* @description Metodo para monitorear el estado de las palabras claves y clientes del servicio
*/
function monitoringStatus(req, res) {

 return res.status(200).json({
   keywordsActives,
   socketClients: Object.keys(socketClients).map((index) => {
     const client = socketClients[index];
     return { id: client.id, secret: client.secret }
   })
 });

}

export default {
  subscribeKeyword,
  unsubscribeKeyword,
  monitoringStatus
}
