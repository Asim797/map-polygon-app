import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from "./components/Map";

function App() {
    const defaultCenter: [number, number] = [51.505, -0.09];
    const defaultZoom = 13;

  return (
    <div className="App">
      <MapComponent center={defaultCenter} zoom={defaultZoom} />
    </div>
  );
}

export default App;
