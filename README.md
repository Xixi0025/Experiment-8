# Countdown Timer - Experiment 8

A professional, interactive countdown timer built with vanilla JavaScript, HTML, and CSS. This project demonstrates the use of JavaScript's `setInterval()` and `clearInterval()` methods for time-based operations.

## Features

- **Two Countdown Modes:**
  - Countdown to a specific date and time
  - Countdown for a set duration (hours, minutes, seconds)

- **Real-time Display:**
  - Shows remaining time in format: DD days HH:MM:SS
  - Updates every second using `setInterval()`
  - Large, easy-to-read timer display

- **Control Buttons:**
  - Start - Begin the countdown
  - Pause - Temporarily stop the countdown
  - Resume - Continue from paused state
  - Reset - Return to initial time
  - Stop - Terminate countdown completely

- **Smart Features:**
  - Automatic completion detection
  - Color-coded warnings (green → yellow → red)
  - Critical alert in final 10 seconds
  - Responsive design for all devices
  - Proper timer cleanup with `clearInterval()`

## File Structure

```
countdown-timer/
├── index.html          # HTML structure and layout
├── style.css           # Styling and responsive design
├── script.js           # Countdown logic and event handling
└── README.md           # Project documentation
```

## How to Use

1. **Open the Application:**
   - Open `index.html` in your web browser
   - No server or dependencies required

2. **Select Countdown Mode:**
   - Choose between "Specific Date" or "Duration" mode
   - Toggle buttons at the top of the application

3. **Set Countdown Time:**
   - **For Date Mode:** Enter target date and time
   - **For Duration Mode:** Enter hours, minutes, and seconds
   - Default is 7 days from current date (Date mode)

4. **Start Countdown:**
   - Click the "Start" button to begin
   - Timer updates every second

5. **Control During Countdown:**
   - **Pause:** Freeze the timer
   - **Resume:** Continue from pause
   - **Reset:** Return to initial time
   - **Stop:** End countdown permanently

6. **Completion:**
   - When countdown reaches zero, displays "COUNTDOWN COMPLETE!"
   - Display turns red for final 10 seconds
   - Timer automatically stops and clears interval

## Key JavaScript Concepts Demonstrated

- **setInterval()** - Updates timer every 1000ms
- **clearInterval()** - Stops timer when countdown reaches zero
- **Date Object** - Calculates time differences using `getTime()`
- **DOM Manipulation** - Updates display in real-time
- **Event Listeners** - Handles button clicks
- **State Management** - Tracks timer running/paused/stopped states
- **Time Calculations** - Converts milliseconds to days/hours/minutes/seconds

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Running the Application

### Local Development

1. **Clone or download** the project files
2. **Navigate** to the project directory
3. **Open** `index.html` directly in your browser
4. Start using the countdown timer

### No Installation Required
- No npm packages needed
- No build process required
- No server setup needed
- Works directly from the file system

## Code Highlights

### Timer Update Loop
```javascript
setInterval(updateTimer, 1000);
```

### Stopping the Timer
```javascript
clearInterval(timerInterval);
```

### Time Calculation
```javascript
const timeLeft = targetTime - new Date().getTime();
const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
```

## Use Cases

- Event countdowns (launches, sales, deadlines)
- Workout timers
- Study session timers
- Promotional countdowns
- Game timers
- Cooking timers

## Notes

- Times are calculated in your local timezone
- Closing the browser window stops the timer
- The timer uses accurate millisecond calculations
- All button states are properly managed to prevent conflicts
