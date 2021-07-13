const services = {
  monitoring: {
    base_url: 'localhost:4001',
  },
  events:     {
    base_url: 'localhost:4000',
  }
};

// Servicio de monitoreo
services.monitoring.ws_url    = 'ws://'   + services.monitoring.base_url;
services.monitoring.http_url  = 'http://' + services.monitoring.base_url;
services.monitoring.api_url   = services.monitoring.http_url + '/api';

// Servicio de eventos
services.events.ws_url    = 'ws://'   + services.events.base_url;
services.events.http_url  = 'http://' + services.events.base_url;
services.events.api_url   = services.events.http_url + '/api';

export default services;
