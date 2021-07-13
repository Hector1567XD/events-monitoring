import { socketClients, keywordsActives } from '../stores/index.js';

class MonitoringService {

  /**
    * @description Maneja el nuevo evento, notificando a los clientes del nuevo
    * evento (si coincide con sus keywords)
    * @param  {Event} event
    */
  static handleNewEvent(event) {
    // Obtenemos las keywords que se relacionan con el evento
    const keywords = MonitoringService.getKeywordsRelated(event);
    // Recorremos las etiquetas y notificamos a sus clientes
    keywords.map(keyword =>
      MonitoringService.sendEventToKeywordClients(keyword, event)
    )
  }

  /**
    * @description Envia un evento a los clientes relacionados a una keyword
    * @param  {Keyword} keyword
    * @param  {Event}   event
    */
  static sendEventToKeywordClients(keyword, event) {
    // Recorremos el arreglo de clientes en la keyword y les enviamos el evento
    keyword.map((reference) => {
      const client = socketClients[reference.id];
      client.send(JSON.stringify({
        method:     'new-event',
        data:       event
      }));
    });
  }

  /**
    * @description Obtiene las palabras claves activas relacionadas al evento
    * @param  {Event} event
    * @return {Array} keywords
    */
  static getKeywordsRelated(event) {

    // TODO: Implementar https://lunrjs.com
    // TODO: Cuando se implemente lunrjs.com implementarlo con StrategyPattern

    const keywordsFounded = [];
    for (let keyword in keywordsActives) {
      if (!keywordsActives.hasOwnProperty(keyword)) continue;

      // Si la palabra clave resulta estar en la descripcion, agregala a las relacionadas
      const description = event.description.toLowerCase()
      if (description.includes(keyword))
        keywordsFounded.push(keywordsActives[keyword]);
    }
    return keywordsFounded;

  }

}

export default MonitoringService;
