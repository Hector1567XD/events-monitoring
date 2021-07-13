import bodyParser  from 'body-parser';
import mongoose    from 'mongoose';
import express     from 'express';
import cors        from 'cors';
// Rutas, Websockets, Hooks y Configuracion
import apiRoutes   from './routes/api.js';
import config      from './config/database.js';

// Aplicacion de express
const app = express();
// Base de datos
mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
        .then(()    => console.log('El proyecto se ha conectado a MongoDB! 💾'))
        .catch(err  => console.log(err));
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// Rutas y Hooks
app.get('/', (req, res) => { res.send("El servicio de eventos esta vivo! 📟") });
  // /api/
  app.use('/api', apiRoutes);

// Inicializar el servidor HTTP
const server = app.listen(3000, () => console.log('El servicio de eventos esta corriendo... 🏁'));
