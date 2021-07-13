import express from 'express';
const router = express.Router();

// Controlladores
import EventController from '../controllers/event-controller.js';

// Crear evento
router.post    ('/events',   EventController.store);
// Listar eventos
router.get     ('/events',   EventController.index);
// Borrar todos los eventos
router.delete  ('/events',   EventController.clear);

export default router;
