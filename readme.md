# Sistema de monitoreo de eventos

Este sistema tiene un cliente que permite a sus usuarios subscribirse a una lista de **palabras clave** a un servicio de monitoreo, dicho servicio estará recibiendo eventos continuamente, si recibe uno cuya descripción contenga una de las palabras claves entonces enviara este evento al cliente donde se mostrara en un mapa.

Este sistema fue realizado como prueba tecnica para **Sosafe**.

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos 📋

Para poder poner el proyecto en funcionamiento en tu sistema operativo, sera necesario que:

* Tengas instalado [Git](https://git-scm.com/downloads)
* Tengas instalado [Docker](https://docs.docker.com/installation/#installation)
* Tengas instalado [Compose](https://docs.docker.com/compose/install/)

Adicionalmente, para hacer uso de los mapas de la aplicacion sera necesario tambien que:
* Generes una API Key en [Google Maps Platform](https://console.cloud.google.com/google/maps-apis/)

Puedes ver mas informacion acerca de como hacerlo en la [documentacion oficial](https://developers.google.com/maps/documentation/javascript/cloud-setup/) de los servicios de Google Cloud

## Instalacion para desarrollo 🔧

Como notaste en los pre-requisitos este proyecto ha sido dockerizado, por lo que ponerlo a funcionar para desarrollo y testeo es realmente facil 😋!

Primero tendras que clonar el repositorio desde [Github](https://github.com/Hector1567XD/events-monitoring.git)

```bash
$ git clone https://github.com/Hector1567XD/events-monitoring.git
$ cd events-monitoring
```

Despues, tendras que crear o copiar un `.env` dentro de la carpeta `/monitoring-frontend-app/`
```bash
$ cp /monitoring-frontend-app/.env.example /monitoring-frontend-app/.env
```

En este _.env_ tendras que escribir tu API Key de Google Maps Platform para que la aplicacion pueda hacer uso de esta
```
REACT_APP_GOOGLE_MAPS_API_KEY = 'TU API KEY'
```

Por ultimo dentro de la carpeta del proyecto tendras que levantar los contenedores haciendo uso de

```bash
$ docker-compose up
```

Todo listo 🧙‍♂️,  haz desplegado los 2 servicios y los 2 clientes del sistema, para acceder a los clientes de frontend:

- Aplicacion de monitoreo en [localhost:4005](http://localhost:4005)
- Interface de eventos en [localhost:4006](http://localhost:4006)

## Arquitectura ⚙️

Este proyecto fue construido con una arquitectura de micro-servicios, cuenta tambien con un frontend distribuido en 2 aplicaciones separada la una de la otra y se comunicacion con los micro-servicios directamente haciendo uso de API Rest y Sockets.

Este proyecto no cuenta con una API Gateway de _momento._

Todos los micro-servicios y aplicaciones que componen al sistema se encuentran dentro de un mismo repositorio, resultando en la estructura de carpetas:

```bash
├── avents-frontend-app
├── events-service
├── monitoring-frontend-app
└── monitoring-service
```

Todos los contenedores usan [node:13](https://hub.docker.com/_/node) exceptuando un quinto contenedor declarado en el docker-compose.yml que hace uso de [mongo](https://hub.docker.com/_/mongo) para servir la base de datos

### Servicio de eventos
Es un pequeño micro-servicio que sirve de CRUD al sistema para la creacion de eventos, fue construido en Express y emplea Mongoose como ODM.

### Servicio de monitoreo
Es un pequeño micro-servicio que recibe un hook del micro-servicio de eventos cada vez que crea un nuevo evento, emplea websockets para mantener una comunicacion una aplicacion cliente, tambien sirve una API Rest para crear nuevas subscripciones

Para hacer uso de la API Rest del servicio de monitoreo debera enviar en las cabezeras de la peticion el `id de cliente` y el `token secreto` del socket asociado al cliente.

### Aplicacion de monitoreo
Es una pequeña aplicacion que puede comunicarse con el servicio de monitoreo por medio de websockets para recibir notificacion de la creacion de nuevos eventos, puede ademas por medio de una API Rest que sirve el servicio de monitoreo crear nuevas subscripciones con dicho servicio con distintas palabras claves.

### Interface de eventos
Es una pequeña aplicacion de tipo CRUD construida en VUE, a la cual se puede acceder desde [localhost:4006](http://localhost:4006), se comunica con el servicio de eventos para:
1. Listar los eventos existentes en la base de datos del sistema
2. Crear nuevos eventos

## Documentacion 📖

Puedes encontrar como comunicarte con la API Rest de los servicios de este proyecto entrando a la [Referencia de la API](https://documenter.getpostman.com/view/4092353/Tzm8Eup6#48cb5ce6-7c25-4664-8ef9-058f5ab7aff5), la cual fue generada con [Postman](https://www.postman.com)

## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE.md](LICENSE.md) para detalles
