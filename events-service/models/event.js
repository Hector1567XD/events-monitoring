import mongoose from 'mongoose';
const { Schema } = mongoose;

// Esquema de Mongoose del Evento
const EventSchema = new Schema({
  // Descripcion
  description: {
    type:     String,
    required: [true,  'La descripcion es requerida'],
    maxLength:[512,   'Esta descripcion es demaciado larga']
  },
  // Localizacion
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number] /*[<longitude>, <latitude>]*/,
      required: true
    }
  }
});

// Modelos de base de datos
export default mongoose.model('event', EventSchema);
