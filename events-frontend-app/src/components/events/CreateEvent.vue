<template>
    <div class="mb-3">
      <div class="row my-1">
        <div class="col-12">
          <h4>Creacion de un nuevo evento 🚩</h4>
        </div>
        <div class="col-12">
          <!-- <label for="eventDescriptionInput" class="form-label">Descripcion</label> -->
          <input v-model="description" type="email" :disabled="disabled"
            class="form-control" id="eventDescriptionInput"
            placeholder="Escribe un texto que describa lo que esta ocurriendo..."
          >
        </div>
      </div>
      <div class="row my-1">
        <!-- Medida temporal, se planea poner un mapa -->
        <div class="col-6">
          <input type="number" v-model="lat" :disabled="disabled"
            class="form-control mr-1" placeholder="latitud" >
        </div>
        <div class="col-6">
          <input type="number" v-model="lng" :disabled="disabled"
            class="form-control ml-1" placeholder="longitud" >
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <button @click="submit" :disabled="disabled" class="btn btn-primary mb-3">Crear evento</button>
        </div>
      </div>
    </div>
</template>

<script>

const defaultInputs = {
  lat: null,
  lng: null,
  description: null,
}

export default {
  name: 'CreateEvent',
  props: {
    disabled: Boolean
  },
  data() {
    return { ...defaultInputs }
  },
  methods: {
    submit(evt) {

      evt.preventDefault();
      const { description, lat, lng } = this;

      this.$emit('submit', {
        description,
        lat,
        lng
      })

      // Limpiamos los inputs
      this.cleanInputs();

    },
    cleanInputs() {
      this.description  = null;
      this.lat          = null;
      this.lng          = null;
    }
  }
}
</script>

<style scoped>
</style>
