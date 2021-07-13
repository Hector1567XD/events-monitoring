import express from 'express';
const router = express.Router();

import MonitoringController from '../controllers/monitoring-controller.js';

import httpSocketAuth       from '../middlewares/http-socket-auth.js';
import adminAuthorization   from '../middlewares/admin-authorization.js';

// Admin/Debug Route
router.get('/monitoring-status',        adminAuthorization, MonitoringController.monitoringStatus)
// Subscribirse a una palabra clave
router.post('/keyword-subscriptions',   httpSocketAuth,     MonitoringController.subscribeKeyword)
// Desuscribirse de una palabra clave
router.delete('/keyword-subscriptions', httpSocketAuth,     MonitoringController.unsubscribeKeyword)

export default router;

/**
  * @todo: Se pueden desarrollar 2 pares de middlewares mas adicionales a
  * httpSocketAuth y a adminAuthorization, haciendo que inyectes dentro del
  * request datos como isAdmin o socketClient, estos middlewares SIEMPRE se
  * ejecutaran y la idea es que sean un paso previo a los middlewares existentes
  */
