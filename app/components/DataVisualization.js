"use client"
import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import baseGeoJSONData from '../datasets/base.geojson'; // Import the JSON file

const calculateCenter = (points) => {
  if (points.length === 0) return [0, 0]; // Default center
  const totalLat = points.reduce((acc, point) => acc + point.lat, 0);
  const totalLng = points.reduce((acc, point) => acc + point.lng, 0);
  const avgLat = totalLat / points.length;
  const avgLng = totalLng / points.length;
  return [avgLat, avgLng];
};

const mapGeojsonPoints = (geojsonPoints) => {
  return geojsonPoints.features.map((prop) => ({
    lat: prop.geometry.coordinates[1],
    lng: prop.geometry.coordinates[0],
    size: Math.random(),
    color: 'rgba(255, 255, 255, 1)',
    name: "prop.properties.name",
  }));
};

const DataVisualization = ({ geojsonPoints, showMap }) => {
  const [gData, setGData] = useState([]);
  const [baseFeatures, setBaseFeatures] = useState([]);
  const globeRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    setBaseFeatures(baseGeoJSONData.features);
    if (geojsonPoints) {
      const pointsData = mapGeojsonPoints(geojsonPoints);
      setGData(pointsData);
      // Update the center of the globe and map
      if (pointsData.length > 0 && (globeRef.current || mapRef.current)) {
        if (globeRef.current) {
          const globeCenter = calculateCenter(pointsData);
          globeRef.current.pointOfView({ lat: globeCenter[0], lng: globeCenter[1], altitude: 3 }, 2000);
        }
        
        if (mapRef.current) {
          const firstPoint = pointsData[0];
          mapRef.current.setView([firstPoint.lat, firstPoint.lng]);
        }
      }
    }
  }, [geojsonPoints]);

  useEffect(() => {
    // This code will run after showMap state has been updated
    if (!showMap && globeRef.current) {
      const globeCenter = calculateCenter(gData);
      globeRef.current.pointOfView({ lat: globeCenter[0], lng: globeCenter[1], altitude: 3 }, 2000);
    } else if (showMap && mapRef.current) {
      const firstPoint = gData[0];
      mapRef.current.setView([firstPoint.lat, firstPoint.lng]);
    }
  }, [showMap]);

  let mapCenter = [-6.40, 106.81]
  if (gData.length > 0) {
    gData[0].lat
    mapCenter = [gData[0].lat, gData[0].lng]
  }

  const screenWidth = window.innerWidth || 1000; // Default width if window.innerWidth is not available
  const screenHeight = window.innerHeight || 1000; // Default width if window.innerWidth is not available
  const globeWidth = screenWidth * 0.8;
  
  return (
    <>
      {showMap ? (
        <div style={{ height: '95vh', width: '100%' }}>
          <MapContainer
            center={mapCenter}
            zoom={15}
            style={{ height: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {gData.map((point, index) => (
              <Marker key={index} position={[point.lat, point.lng]}>
                <Popup>{point.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : (
        <div style={{ height: '95vh', width: '100%' }}>
          <Globe
            width={globeWidth}
            ref={globeRef}
            // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            labelsData={baseFeatures}
            pointsData={gData}
            labelLat={(d) => d.properties.latitude}
            labelLng={(d) => d.properties.longitude}
            labelText={(d) => d.properties.name}
            labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
            labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
            labelColor={() => 'rgba(255, 255, 255, 1)'}
            labelResolution={2}
          />
        </div>
      )}
    </>
  );
};


export default DataVisualization;
