import React from 'react';
import { MapContainer } from 'react-leaflet';
import MapComponent from '../components/Map'; // Adjust the path as needed

export default {
    title: 'Map/MapComponent',
    component: MapComponent,
};

const Template = (args: any) => (
    <MapContainer center={args.center} zoom={args.zoom} style={{ height: '400px', width: '100%' }}>
        <MapComponent {...args} />
    </MapContainer>
);

export const DefaultView = Template.bind({});
// @ts-ignore
DefaultView.args = {
    center: [51.505, -0.09],
    zoom: 13,
};

export const DrawingPolygon = Template.bind({});
// @ts-ignore
DrawingPolygon.args = {
    center: [51.505, -0.09],
    zoom: 13,
};

// You can simulate a polygon drawing scenario by creating a button that triggers a draw event
// For demonstration purposes, you can add notes in the description
// @ts-ignore
DrawingPolygon.parameters = {
    docs: {
        description: {
            story: 'Demonstrates the process of drawing a new polygon.',
        },
    },
};

export const EditingPolygon = Template.bind({});
// @ts-ignore
EditingPolygon.args = {
    center: [51.505, -0.09],
    zoom: 13,
    polygons: [
        [
            [
                [51.51, -0.1],
                [51.51, -0.12],
                [51.49, -0.12],
                [51.49, -0.1],
                [51.51, -0.1]
            ]
        ]
    ]
};

// You can simulate a polygon editing scenario as well
// @ts-ignore
EditingPolygon.parameters = {
    docs: {
        description: {
            story: 'Demonstrates editing an existing polygon by moving vertices.',
        },
    },
};

export const IntersectionError = Template.bind({});
// @ts-ignore
IntersectionError.args = {
    center: [51.505, -0.09],
    zoom: 13,
    polygons: [
        [
            [
                [51.51, -0.1],
                [51.51, -0.12],
                [51.49, -0.12],
                [51.49, -0.1],
                [51.51, -0.1]
            ]
        ],
        [
            [
                [51.52, -0.1],
                [51.51, -0.12],
                [51.50, -0.12],
                [51.50, -0.1],
                [51.52, -0.1]
            ]
        ],
    ]
};

// This can simulate a situation where polygons intersect.
// Add notes in the description to explain the scenario.
// @ts-ignore
IntersectionError.parameters = {
    docs: {
        description: {
            story: 'Demonstrates handling and displaying errors when polygons intersect.',
        },
    },
};