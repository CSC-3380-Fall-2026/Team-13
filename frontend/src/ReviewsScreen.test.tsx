// frontend/src/ReviewsScreen.test.tsx
import React from 'react';
import { Alert } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ReviewsScreen } from './ReviewsScreen';

const TEXT = {
  writeReview: 'Write a Review',
  submit: 'Submit Review',
  ratingPlaceholder: 'e.g., 5',
  commentPlaceholder: 'Leave your review...',
  ratingError: 'Please enter a valid rating between 1 and 5 stars.',
  commentError: 'Please type a review before submitting.',
  alertTitle: 'Validation Error',
};

const overall = (value: string) => `Overall Rating: ${value} ⭐`;
const total = (count: number) => `Total Reviews: ${count}`;

// Fills out and submits the review form the way a user would
const submitReview = async (rating: string, comment: string) => {
  await fireEvent.press(screen.getByText(TEXT.writeReview));
  if (rating !== '') {
    await fireEvent.changeText(screen.getByPlaceholderText(TEXT.ratingPlaceholder), rating);
  }
  if (comment !== '') {
    await fireEvent.changeText(screen.getByPlaceholderText(TEXT.commentPlaceholder), comment);
  }
  await fireEvent.press(screen.getByText(TEXT.submit));
};

describe('ReviewsScreen review logic', () => {
  let alertSpy: jest.SpyInstance;

  beforeEach(async () => {
    // mockImplementation keeps the real native alert from firing during tests
    alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    await render(<ReviewsScreen />);
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  describe('initial state', () => {
    it('shows 0.0 average and zero reviews', () => {
      expect(screen.getByText(overall('0.0'))).toBeTruthy();
      expect(screen.getByText(total(0))).toBeTruthy();
    });
  });

  describe('rating validation', () => {
    it('rejects a missing rating', async () => {
      await submitReview('', 'Great spot');

      expect(alertSpy).toHaveBeenCalledWith(TEXT.alertTitle, TEXT.ratingError);
      expect(screen.getByText(total(0))).toBeTruthy();
    });

    it.each(['0', '6', '-1', 'abc'])('rejects invalid rating "%s"', async (badRating) => {
      await submitReview(badRating, 'Great spot');

      expect(alertSpy).toHaveBeenCalledWith(TEXT.alertTitle, TEXT.ratingError);
      expect(screen.getByText(total(0))).toBeTruthy();
    });
  });

  describe('comment validation', () => {
    it.each([
      ['empty', ''],
      ['whitespace-only', '   '],
    ])('rejects an %s comment', async (_label, comment) => {
      await submitReview('4', comment);

      expect(alertSpy).toHaveBeenCalledWith(TEXT.alertTitle, TEXT.commentError);
      expect(screen.getByText(total(0))).toBeTruthy();
    });
  });

  describe('rating math', () => {
    it('accepts a valid review without showing an alert', async () => {
      await submitReview('5', 'Amazing place!');

      expect(alertSpy).not.toHaveBeenCalled();
      expect(screen.getByText(overall('5.0'))).toBeTruthy();
      expect(screen.getByText(total(1))).toBeTruthy();
    });

    it('updates the average and count across multiple reviews', async () => {
      await submitReview('5', 'Amazing place!');
      await submitReview('3', 'It was okay.');

      expect(screen.getByText(overall('4.0'))).toBeTruthy();
      expect(screen.getByText(total(2))).toBeTruthy();
    });

    it('formats non-whole averages to one decimal place', async () => {
      await submitReview('5', 'Loved it');
      await submitReview('4', 'Pretty good');

      expect(screen.getByText(overall('4.5'))).toBeTruthy();
      expect(screen.getByText(total(2))).toBeTruthy();
    });
  });
});