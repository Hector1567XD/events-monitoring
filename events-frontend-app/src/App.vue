<template>
  <div id="app" class="container" >
      <div class="row mb-3">
        <div class="col-12 justify-content-center">
          <img alt="Vue logo" class="logo-min mb-3" src="./assets/vector-map.png">
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-6">
          <CreateEvent  @submit="createEvent" :disabled="itsLoading" />
        </div>
        <div class="col-12 col-lg-6">
          <EventsList   :events="events" />
        </div>
      </div>
  </div>
</template>

<script>
import CreateEvent      from './components/events/CreateEvent.vue'
import EventsList       from './components/events/EventsList.vue'
import EventsService     from './services/events-service'

export default {
  name: 'App',
  data() {
    return {
      events: [],
      itsLoading: false
    }
  },
  components: {
    CreateEvent,
    EventsList
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    /** Metodo para solicitar al serivicio de eventos, la lista de eventos creados
     */
    getEvents() {

      this.itsLoading = true;
      const { handleErrorRequest, finallyRequest } = this;

      EventsService.get()
      .then((res) => {
        this.events = [ ...res.data ];
      })
      .catch(handleErrorRequest)
      .finally(finallyRequest)

    },
    /** Metodo para solicitar al servicio de eventos, crear un evento
     *  @param event datos del evento a crear
     */
    createEvent(event) {

      this.itsLoading = true;
      const { handleErrorRequest, finallyRequest } = this;

      EventsService.create(event)
      .then((res) => {
        this.events.push(res.data);
        this.$toast.success('Evento creado con exito 👍🏻!');
      })
      .catch(handleErrorRequest)
      .finally(finallyRequest)

    },
    // Metodo que se empleara para manejar todos los errores de este componente
    handleErrorRequest(e) {
      console.log(e.error);
      if (e.response.data)
        this.$toast.error(e.response.data);
      else
        this.$toast.error(e.message);
    },
    // Metodo que se empleara para finalizar todas las peticiones de este componente
    finallyRequest() {
      this.itsLoading = false;
    },
  }
}
</script>

<style>

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .logo-min {
    width: 250px!important;
    max-width: 250px;
    height: auto;
  }

</style>
