# QA Bug Reports (Dev Branch)

| Bug ID | Severity | Description | Reproduction Steps | Status |
|--------|----------|-------------|--------------------|--------|
| 001    | Severe   | **React Native Web DOM Crash:** The application fatally crashes on the Expo Go mobile client when rendering the Reviews screen because it was built using incompatible React web elements (`<div>`, `<form>`) instead of React Native components (`<View>`, `<Text>`). | 1. Launch PopMap via Expo Metro Bundler.<br>2. Open the app in the Expo Go client on a physical device.<br>3. Navigate to the Ratings & Reviews screen.<br>4. Observe the fatal application crash. | Fixed |
| 002    | Moderate | **Rating Validation NaN Bypass:** Entering non-numeric text (e.g., "a") into the star rating input bypasses the 1-5 validation check and successfully submits the review. The JS engine converts the text to `NaN`, which evaluates `NaN < 1` and `NaN > 5` as false, bypassing the error alert. Found by unit test `rejects invalid rating "abc"`. Fixed by adding a `Number.isNaN` check in `handleSubmit`. | 1. Navigate to the Ratings & Reviews screen.<br>2. Tap 'Write a Review'.<br>3. Enter a non-numeric character (e.g., "a") into the 1-5 rating input (easiest on Expo web or by pasting, since the mobile numeric keypad blocks letters).<br>4. Enter any valid text into the review comment box.<br>5. Tap 'Submit Review'.<br>6. Observe the review is posted instead of blocking the user. | Fixed |


