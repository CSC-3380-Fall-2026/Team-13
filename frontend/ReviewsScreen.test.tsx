import React from 'react';
import { render } from '@testing-library/react-native';
import { ReviewsScreen } from './ReviewsScreen';

describe('ReviewsScreen Component', () => {
  it('renders the default overall rating correctly', () => {
    const { getByText } = render(<ReviewsScreen />);
    
    // Check if the initial state calculation renders 0.0 stars
    const defaultRatingText = getByText('Overall Rating: 0.0 ⭐');
    expect(defaultRatingText).toBeTruthy();
  });
});