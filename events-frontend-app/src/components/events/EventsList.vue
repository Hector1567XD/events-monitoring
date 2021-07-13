<template>
    <div>
      <div class="list-group">
          <div v-for="event in events" :key="event._id" href="#"
            class="list-group-item"
          >
            <span class="mb-1">{{ event.description }}</span>
            <br />
            <small class="gray">{{ positionLegible(event) }}</small>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'EventsList',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  methods: {
    positionLegible(event) {
      return {
        lat: event.location.coordinates[0],
        lng: event.location.coordinates[1]
      }
    }
  }
}
</script>

<style scoped>
  .column-center-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
