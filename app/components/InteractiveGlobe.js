"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import UploadGeojsonData from './UploadGeojsonData'; // Corrected filename
import DataVisualization from './DataVisualization';

import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const InteractiveGlobe = () => {
  const [geojsonPoints, setGeojsonPoints] = useState(null);
  const [showMap, setShowMap] = useState(true);

  const handleFileUpload = (jsonData) => {
    setGeojsonPoints(jsonData);
  };

  const toggleView = () => {
    setShowMap(prevShowMap => !prevShowMap);
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));


  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', maxWidth: '100%' }}>
        <div style={{ width: '100%' }}>
          <DataVisualization geojsonPoints={geojsonPoints} showMap={showMap} onFileUpload={handleFileUpload} />
        </div>
      </div>
      <div style={{ flex: '0 0 20%', backgroundColor: '#ffffff', padding: '20px', borderLeft: 'ridge' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <FormGroup style={{ width: '100%', alignItems: 'center', border: 'outset', padding: '10px' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Globe View</Typography>
                  <AntSwitch checked={showMap} onChange={toggleView} inputProps={{ 'aria-label': 'ant design' }} />
              <Typography>Map View</Typography>
            </Stack>
          </FormGroup>
        </div>
        <UploadGeojsonData onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
};

export default InteractiveGlobe;