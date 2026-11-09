import React from 'react';
import { render } from '@testing-library/react-native';
import SearchScreen from './SearchScreen';

describe('SearchScreen Component', () => {
  it('renders gracefully without crashing when the backend response is undefined', () => {
    // This test ensures we avoid the fatal "undefined is not a function" error 
    // by checking that the fallback UI renders correctly.
    const { getByText } = render(<SearchScreen />);

    expect(getByText('No businesses found. Check terminal logs!')).toBeTruthy();
  });
});