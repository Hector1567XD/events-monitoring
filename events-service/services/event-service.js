import Event from '../models/event.js';
// Basado en: www.codementor.ioevanbechtol/node-service-oriented-architecture-12vjt9zs9i

class EventService {

  /**
   * @description Intenta crear un evento con el objeto provisto
   * @param eventData {{ description, location: { type, coordinates } }} Objeto
   * con los campos requeridos para crear el evento
   * @returns {Promise<Event|Error>}
   */
  static async create ( eventData ) {

    const newEvent = new Event(eventData);
    return await newEvent.save();

  }

  /**
   * @description Intenta encontrar todos los eventos
   * @returns {Promise<Event|Error>}
   */
  static async getAll ( ) {
    return await Event .find();
  }

  /**
   * @description Intenta encontrar todos los eventos que coincidan con una
   * palabra clave dada
   * @param {String} keyword
   * @returns {Promise<Event|Error>}
   */
  static async getEventsByKeyword ( keyword ) {
    /**
      * TODO: Implementar por una estrategia nueva en  StrategyPattern otra
      * forma alternativa de buscar quiza con full-text search
      */
    return await Event .find({
      "description": { "$regex": keyword, "$options": "i" }
    });
  }

  /**
   * @description Borrar todos los eventos
   * @returns {Promise<Boolean|Error>}
   */
  static async deleteAll ( ) {
    return await Event .remove({});
  }

}

export default EventService;
