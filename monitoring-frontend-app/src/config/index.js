import services from './services'
//import dotenv   from 'dotenv';

//console.log('DOTENV', process.env)

const config = {
  services,
  "google-maps": {
    api: {
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }
  }
};
console.log('config', config)

export default config;
