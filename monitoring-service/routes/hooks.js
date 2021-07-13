import express from 'express';
const router = express.Router();

import MonitoringService from '../services/monitoring-service.js';

// Recibir desde el servicio de eventos que un nuevo evento fue creado
router.post('/new-event', (req, res) => {
  const event = req.body;

  // Se valida la peticion
  if (!event || !event._id)
    return res.status(400).send("El evento enviado esta incompleto o mal formateado.");

  console.log('Se ha recibido el evento '+event._id+'!');

  // Envie el evento a los usuarios cuyas keywords tengan relacion con el mismo
  MonitoringService.handleNewEvent(event);

  res.status(200).send("Recibido.");
});


export default router;
