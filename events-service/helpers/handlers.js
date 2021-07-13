import mongoose from 'mongoose';

export function errorResponseHandler(e, req, res) {
  console.error(e)
  // Solo si aun no se envia respuesta al frontend, enviar una respuesta de error
  if (!res.headersSent) {
    // Inicializamos el error que enviaremos al frontend
    let errorMessage = e.message;

    /* Si el error es un error de validacion, entonces recorremos los errores
       y nos quedamos con algun error */
    if (e instanceof mongoose.Error.ValidationError)
      for (let field in e.errors)
        errorMessage = e.errors[field].message

    // finalmente enviamos el error al frontend
    res.status(500).send(errorMessage)
  }
}
