import axiosClient      from '../utility/axios-client';
import config           from '../config';

const get   = () => {
  return axiosClient.get(config.services.events.api_url + '/events')
}

const create = (event) => {
  return axiosClient.post(config.services.events.api_url + '/events', event)
}

export default {
  get, create
}
