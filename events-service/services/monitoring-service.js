import axiosClient        from '../connection/axios-client.js';
import config             from '../config/services.js';

class MonitoringService {
  static urlBase

  /**
   * Notifica de la creacion de un nuevo evento al servicio de monitoreo
   * @param {Event} event
   * @returns {Promise<Response.data|Error>}
   */
  static async notifyNewEvent(event) {
      const res = await axiosClient.post( MonitoringService.urlBase + '/hooks/new-event', event );
      if (res.status === 200)
        return res.data;

      throw new Error( res.data );
  }

}

MonitoringService.urlBase = config['monitoring-service'].url;
export default MonitoringService;
