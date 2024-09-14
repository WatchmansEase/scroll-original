# Scroll Event Observer with Mobile Optimization

## Overview

This project demonstrates the use of the **Observer Pattern** in JavaScript to handle scroll events. It tracks scroll progress and triggers events at specific percentage points (25%, 50%, and 100%) in a web article. A toast notification appears when these scroll points are reached, providing feedback to the user about their progress through the article.

## Design Pattern: Observer Pattern

The **Observer Pattern** is used to decouple the logic that tracks scroll events from the logic that responds to those events. Here’s how the pattern is applied:

- **ScrollSubject**: This class represents the "subject" that tracks scroll events. It maintains a list of observers and notifies them when the user scrolls.
- **ScrollPercentageObserver**: This class represents the "observer" that responds to the scroll events. It calculates the percentage of the page that has been scrolled and triggers a notification when a milestone is reached.

This pattern allows for future extensibility by adding more observers that could respond to the scroll events in different ways.

## Optimizations for Mobile

Mobile-specific optimizations were made to ensure a smooth user experience on smaller screens:

- In the `style.css` file, a media query is used to adjust the layout and functionality for mobile devices.
- This ensures that elements such as the toast notifications are appropriately sized and remain visible on smaller screens, improving usability.

## Key Features

1. **Scroll Tracking with Toast Notification**:
   - The app tracks the user's scroll progress and provides feedback when they reach 25%, 50%, and 100% of the page content.
2. **Responsive Design**:
   - The project is optimized for mobile devices with adjustments to the size and positioning of elements like the toast notifications and progress bars.
3. **Dynamic Progress Bar**:
   - A dynamic progress bar is included at the top of the screen, which fills as the user scrolls down the article.
4. **Extensible with Additional Observers**:
   - The Observer Pattern allows for easy addition of new observers if more behaviors need to be triggered by scroll events.

## How to Run

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Open the `index.html` file in a browser:

   ```bash
   open index.html
   ```

3. Scroll through the article and observe the toast notifications and progress bar as you reach the scroll milestones (25%, 50%, 100%).
