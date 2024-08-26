import React, { useEffect } from 'react';
import { useMap, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import booleanOverlap from '@turf/boolean-overlap';

interface MapLogicProps {
    polygons?: L.LatLngExpression[][][];
}
const MapLogic: React.FC<MapLogicProps> = ({ polygons }) => {
    const map = useMap();

    useEffect(() => {
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        const setPolygonStyle = (layer: L.Path, isValid: boolean) => {
            layer.setStyle({
                color: isValid ? 'blue' : 'red',
                weight: 3,
            });
        };

        const drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
            },
            draw: {
                polygon: {},
                polyline: false,
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
            },
        });

        map.addControl(drawControl);

        if (polygons) {
            polygons.forEach((polygon) => {
                const layer = L.polygon(polygon);
                drawnItems.addLayer(layer);
                setPolygonStyle(layer, true);
            });
        }

        map.on(L.Draw.Event.CREATED, (event: any) => {
            const layer = event.layer;
            drawnItems.addLayer(layer);

            // Check for intersection with other polygons
            drawnItems.eachLayer((otherLayer: any) => {
                if (layer !== otherLayer && layer.toGeoJSON().geometry.type === "Polygon") {
                    const isIntersecting = booleanOverlap(layer.toGeoJSON(), otherLayer.toGeoJSON());
                    if (isIntersecting) {
                        setPolygonStyle(layer, false);
                        alert('Polygons intersect!');
                        setTimeout(() => {
                            drawnItems.removeLayer(layer);
                        }, 1500);
                    } else {
                        setPolygonStyle(layer, true);
                    }
                }
            });
        });

        map.on(L.Draw.Event.EDITSTOP, () => {
            const originalDrawnItems: L.FeatureGroup<any> = drawnItems;
            drawnItems.eachLayer((layer: any) => {
                drawnItems.eachLayer((otherLayer: any) => {
                    if (layer !== otherLayer && layer.toGeoJSON().geometry.type === "Polygon") {
                        const isIntersecting = booleanOverlap(layer.toGeoJSON(), otherLayer.toGeoJSON());
                        if (isIntersecting) {
                            setPolygonStyle(layer, false);
                            alert('Polygons intersect!');
                            drawnItems.removeLayer(layer);
                        } else {
                            setPolygonStyle(layer, true);
                        }
                    }
                });
            });
        });


        return () => {
            map.removeControl(drawControl);
            map.removeLayer(drawnItems);
        };
    }, [map, polygons]);

    return null;
};

export default MapLogic;