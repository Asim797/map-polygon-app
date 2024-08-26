import React from 'react';
import { MapContainer, TileLayer, FeatureGroup  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';
import MapLogic from './logics/MapLogic';


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

interface MapComponentProps {
    center: [number, number];
    zoom: number;
    polygons?: L.LatLngExpression[][][];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, polygons }) => {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <FeatureGroup>
                <MapLogic polygons={polygons} />
            </FeatureGroup>
        </MapContainer>
    );
};

export default MapComponent;