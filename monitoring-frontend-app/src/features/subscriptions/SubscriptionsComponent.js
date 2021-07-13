// React
import React, { useRef } from "react";
// Bootstrap
import { Form, Button, ListGroup }    from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';

function SubscriptionsComponent(props) {

  // Referencia del input
  const keywordInputRef      = useRef()
  // Referencia del checkbox de eventos del pasado
  const checkboxPassInputRef = useRef()
  // Toasts Hook
  const { addToast } = useToasts();

  // Mangejador del boton de subscribirse
  const submitHandler = (evt) => {

    evt.preventDefault();

    // Validacion de campo vacio
    if (!keywordInputRef.current.value)
      return addToast('Debe escribir una palabra clave a la cual subscribirse', { appearance: 'error' });

    // Envio al componente padre el evento de creacion
    props.onCreate( keywordInputRef.current.value, checkboxPassInputRef.current.checked );

    // Limpio el campo
    keywordInputRef.current.value = '';

  }

  return (
      <div>
        <h1>Subscripciones</h1>
        <div>
          <Form inline>
            <Form.Control
              className="mb-2 mr-sm-2 w-100"
              id="inlineFormInputName2"
              ref={ keywordInputRef }
              placeholder="Nueva palabra clave"
            />
            <Button
              type="submit"
              onClick={ submitHandler }
              className="mb-2 mr-2"
            >
              Subscribirse
            </Button>
            <Form.Check ref={ checkboxPassInputRef } label="Obtener eventos del pasado" className="mb-2" />
          </Form>
          <ListGroup>
            { props.subscriptions && props.subscriptions.map((subscription, index) =>
              <ListGroup.Item key={index} >{ subscription }</ListGroup.Item>
            ) }
          </ListGroup>
        </div>
      </div>
  );

}

export default SubscriptionsComponent;
