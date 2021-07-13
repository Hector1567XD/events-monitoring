// React
import React, { useState } from "react";
// Mapas de Google
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// Configuracion
import config from '../../config';

const containerStyle = {
  width:      '100%',
  height:     '100%',
  minHeight:  '600px'
};

const center = {
  lat: 0,
  lng: 0
};

const divStyle = {
  background: `white`,
  padding: 10,
  paddingTop: 2,
  paddingBottom: 2,
}

// Estado de las ventanas de informacion del mapa
const useInfoWindows = () => {

  const [infoWindows, setInfoWindows] = useState({});

  const changeInfoWindowsState = (marker, changeAction = 'toggle') => {
    const infosDirectory   = { ...infoWindows };
    // Si aun no eta definido...
    if (!infosDirectory[marker.id]) infosDirectory[marker.id] = { open: false };
    // Si el segundo argumento es 'toggle' entonces invertira el estado, si no
    // tomara el valor del segundo argumento
    infosDirectory[marker.id].open = (changeAction === 'toggle') ? !infosDirectory[marker.id].open : changeAction;
    setInfoWindows(infosDirectory);
  }

  return { infoWindows, setInfoWindows, changeInfoWindowsState };

};


function EventsMap(props) {

  const { infoWindows, changeInfoWindowsState } = useInfoWindows([]);

  // Invierte (muestra o desaparece) el infoWindow del marker (open = !open)
  const onMarkerClick = (marker) => {
    changeInfoWindowsState(marker);
  }

  // Actualiza el estado del infoWindow del marker para que desaparezca (open = false)
  const onCloseClick = (marker) => {
    changeInfoWindowsState(marker, false);
  }

  return (
    <LoadScript googleMapsApiKey={ config["google-maps"].api.key } >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
        >
          <>
            {props.markers && props.markers.map((marker) =>
              <Marker
                onClick={() => onMarkerClick(marker) }
                position={marker.location}
                key     ={marker.id}
                label   ={"❕"}
              >
                { infoWindows[marker.id] && infoWindows[marker.id].open &&
                  <InfoWindow
                    onCloseClick={ () => onCloseClick(marker) }
                  >
                    <div style={ divStyle }>
                      <p style={{ margin: 0 }} >{ marker.description }</p>
                    </div>
                  </InfoWindow>}
              </Marker>
            )}
          </>
        </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(EventsMap)
