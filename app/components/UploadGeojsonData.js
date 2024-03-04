"use client"
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadGeojsonData = ({ onFileUpload }) => {
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith('.geojson')) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result);
            onFileUpload(jsonData);
            setError('');
          } catch (error) {
            setError('Error parsing GeoJSON file.');
          }
        };
        reader.readAsText(file);
      } else {
        setError('Invalid file format. Please upload a GeoJSON file.');
      }
    }
  };

  return (
    <div style={{ width: '100%', alignItems: 'center', marginTop: '10px', padding: '10px' }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        style={{ width: '100%', alignItems: 'center' }}
      >
        Upload Geojson File
        <VisuallyHiddenInput type="file" accept=".geojson" onChange={handleFileUpload} />
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UploadGeojsonData;
