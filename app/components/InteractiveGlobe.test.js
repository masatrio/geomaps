import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InteractiveGlobe from './InteractiveGlobe';

describe('InteractiveGlobe component', () => {
  test('renders without crashing', () => {
    render(<InteractiveGlobe />);
  });

  test('toggles between globe and map view', () => {
    const { getByLabelText } = render(<InteractiveGlobe />);
    const switchButton = getByLabelText('ant design');

    fireEvent.click(switchButton);

    expect(switchButton.checked).toBe(false);
  });

  // Add more test cases as needed
});
