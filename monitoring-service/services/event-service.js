import axiosClient        from '../connection/axios-client.js';
import config             from '../config/services.js';

class EventService {
  static urlBase

  /**
   * Busca un conjunto de eventos en el servicio de eventos filtrados por una palabra clave
   * @param {Event} event
   * @returns {Promise<Response.data|Error>}
   */
  static async getEventsByKeyword(keyword) {
      const res = await axiosClient.get( EventService.urlBase + '/api/events?filter_keyword=' + keyword );
      if (res.status === 200)
        return res.data;
      throw new Error( res.data );
  }

}

EventService.urlBase = config['events-service'].url;
export default EventService;
