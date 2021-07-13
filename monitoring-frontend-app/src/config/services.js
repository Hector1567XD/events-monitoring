const config = {
  service_url_base: 'localhost:4001',
};
config.ws_url_connection    = 'ws://'   + config.service_url_base;
config.http_url_connection  = 'http://' + config.service_url_base;
config.api_url_connection   = config.http_url_connection + '/api';

export default config;
