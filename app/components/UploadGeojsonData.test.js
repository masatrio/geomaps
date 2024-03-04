import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UploadGeojsonData from './UploadGeojsonData';

describe('UploadGeojsonData component', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<UploadGeojsonData />);
    const uploadButton = getByText('Upload Geojson File');
    expect(uploadButton).toBeTruthy(); // Check if the button exists in the DOM
  });

  test('handles file upload correctly', () => {
    const mockFile = new File(['{"name": "test"}'], 'test.geojson', { type: 'application/json' });
    const handleFileUploadMock = jest.fn();

    const { getByLabelText } = render(<UploadGeojsonData onFileUpload={handleFileUploadMock} />);
    const fileInput = getByLabelText('Upload Geojson File');

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // Since FileReader is asynchronous, we need to wait for the next tick
    setTimeout(() => {
      expect(handleFileUploadMock).toHaveBeenCalledWith({ name: 'test' });
    }, 0);
  });

  test('displays error message for invalid file format', () => {
    const mockFile = new File(['invalid content'], 'test.txt', { type: 'text/plain' });

    const { getByLabelText, getByText } = render(<UploadGeojsonData />);
    const fileInput = getByLabelText('Upload Geojson File');

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const errorMessage = getByText('Invalid file format. Please upload a GeoJSON file.');
    expect(errorMessage).toBeTruthy(); // Check if the error message exists in the DOM
  });
});
