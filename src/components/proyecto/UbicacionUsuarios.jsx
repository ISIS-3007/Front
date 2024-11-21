/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ubicaciones from './MapaColombia.json';

// Configurar el icono del marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const UbicacionUsuarios = ({ users }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchCoordinates = () => {
      const locationsWithCoordinates = users.map(user => {
        const coordinates = ubicaciones[user.location];
        return coordinates ? { ...user, ...coordinates } : null;
      });
      setLocations(locationsWithCoordinates.filter(location => location !== null));
    };

    fetchCoordinates();
  }, [users]);

  return (
    <MapContainer center={[4.5709, -74.2973]} zoom={5} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((user, index) => (
        <Marker key={`${user.twitter_id}-${index}`} position={[user.latitude, user.longitude]}>
          <Popup>
            <div>
              <h3>{user.displayname}</h3>
              <p>@{user.username}</p>
              <p>{user.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default UbicacionUsuarios;