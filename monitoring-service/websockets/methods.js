/**
 * @description Metodo para probar websockets
 */
function testMethod(server, client, data) {
  console.log('Se ha recibido un mensaje de prueba de ' + client.id, data.message)
  return client.send(JSON.stringify(
      { successful: true, method: 'notification', message: "Recibido." }
  ));
}

export default {
 "testing": testMethod,
}
