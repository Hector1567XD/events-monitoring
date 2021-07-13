import { socketClients } from '../stores/index.js';

/**
  * Este middleware solo busca "proteger" de forma basica rutas a las que solo
  * debe poder acceder un administrador o son usadas con fines de depuracion
  */
const adminAuthorization = function (req, res, next) {

  const adminPassword = req.headers['x-admin-password'];

  if (!adminPassword || adminPassword !== 'XffKgK84rnNDnBkmNx2akTtd2jEZHtyVeMHVMSwqmwuzwmGf')
    return res.status(403).send('No tienes acceso a esta funcion.');

  req.isAdmin = true;
  next();

};

export default adminAuthorization;
