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

Despues, tendras que crear o copiar un _.env_ dentro de la carpeta _/monitoring-frontend-app/_
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

### Servicio de monitoreo

### Servicio de eventos

### Aplicacion de monitoreo

### Interface de eventos
Es una pequeña aplicacion de tipo CRUD construida en VUE, a la cual se puede acceder desde [localhost:4006](http://localhost:4006), se comunica con el servicio de eventos para:
1. Listar los eventos existentes en la base de datos del sistema
2. Crear nuevos eventos

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - El framework web usado
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [ROME](https://rometools.github.io/rome/) - Usado para generar RSS

## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://gist.github.com/villanuevand/xxxxxx) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Documentacion 📖

Puedes encontrar como comunicarte con la API Rest de los servicios de este proyecto entrando a [Wiki](https://github.com/tu/proyecto/wiki)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Andrés Villanueva** - *Trabajo Inicial* - [villanuevand](https://github.com/villanuevand)
* **Fulanito Detal** - *Documentación* - [fulanitodetal](#fulanito-de-tal)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto.

## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE.md](LICENSE.md) para detalles


---
⌨️ con ❤️ por [Villanuevand](https://github.com/Villanuevand) 😊

https://dillinger.io


---

## Container structures

```bash
├── app
├── web
└── db
```

### app container

- Base image
  - [php](https://hub.docker.com/_/php):8.0-fpm-buster
  - [composer](https://hub.docker.com/_/composer):2.0

### web container

- Base image
  - [nginx](https://hub.docker.com/_/nginx):1.20-alpine
  - [node](https://hub.docker.com/_/node):16-alpine

### db container

- Base image
  - [mysql/mysql-server](https://hub.docker.com/r/mysql/mysql-server):8.0


---

## El resto
You receive a message from a prospective employer:

"Before your interview, write a program that runs a server that is accessible on http://localhost:4000/. When your server receives a request on http://localhost:4000/set?somekey=somevalue it should store the passed key and value in memory. When it receives a request on http://localhost:4000/get?key=somekey it should return the value stored at somekey. Store the data in memory, not in a database, but bear in mind that you will later need to add a database to this code."

Create a new git repository and write code to fulfill the brief to the best of your ability. We will be looking for clean, well tested code in your choice of technology. In addition, the last sentence of the brief implies that you should consider how the code could easily be extended to add an as-yet-unknown data store.

## <a name="Stories">User Stories</a>
```
As a user
So that I can store a variable
I want to be able post my variable

As a user
So that I can retrieve a variable
I want to be able get my variable

As a user
So that I can retrieve a variable
I want a json object to be returned

As a user
So that I can reset the data
I want to reset all variables

As a user
So that I can view all variable
I want to display all variables
```



## <a name="Usage">Usage</a>
### To post your variable
type `http://localhost:4000/set?somekey=somevalue` into your web browser, to set the variable `somekey`

### To get your variable
type `http://localhost:4000/get?key=somekey` into your web browser, to retrieve JSON object of `somekey`

### To reset all saved variables
type `http://localhost:4000/reset` into your web browser, to reset all variables

### To view all saved variables
type `http://localhost:4000/view` into your web browser, to view all variables
https://github.com/adrianeyre/database-tech-test/blob/master/README.md#challenege


---

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```


## Development and deployment With Docker

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

* Local development and testing with compose:
```bash
$ docker-compose up
```

* Local development and testing with just Docker:
```bash
$ docker build -t mean .
$ docker run -p 27017:27017 -d --name db mongo
$ docker run -p 3000:3000 --link db:db_1 mean
$
```

https://medium.com/chingu/keys-to-a-well-written-readme-55c53d34fe6d
