import bodyParser       from  'body-parser';
import mongoose         from  'mongoose';
import express          from  'express';
import ws               from  'ws';
import { v4 as uuidv4 } from  'uuid';
import cors             from  'cors';
// Rutas, Websockets, Hooks y Configuracion
import apiRoutes        from  './routes/api.js';
import hooksRoutes      from  './routes/hooks.js';
import wsServer         from  './websockets/index.js';

// Aplicacion de express
const app = express();
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
// Rutas y Hooks
app.get('/', (req, res) => { res.send("El servicio de monitoreo esta vivo! 📟") });
  // /api/
  app.use('/api',   apiRoutes);
  // /hooks/
  app.use('/hooks', hooksRoutes);

// Inicializar el servidor HTTP
const server = app.listen(3000, () => console.log('El servicio de monitoreo esta corriendo... 🏁'));

// Implementando servidor de websockets en el objeto HTTP nativo que devuelve app.listen()
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
