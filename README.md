## confetti-shower

**A lightweight and customizable JavaScript library for adding festive confetti effects to your web pages.**

**Table of Contents**

* Installation
* Usage
* Customization
* Contributing
* License

**Installation**

1. Open your terminal.
2. Navigate to your project directory.
3. Run the following command:

```bash
npm install confetti-shower
```

**Usage**

1. Import the library in your JavaScript file:

```javascript
import confettiShower from 'confetti-shower';
```

2. Call the `shower` function with desired options:

```javascript
confettiShower({
  duration: 5, // Confetti animation duration in seconds (default: 3)
  colors: ['#ff0000', '#ffff00', '#00ff00'], // Array of confetti colors (default: random)
  shapes: ['circle', 'square', 'star'], // Array of confetti shapes (default: circle)
  count: 100, // Number of confetti pieces (default: 50)
});
```

**Customization**

* `duration`: Animation duration in seconds.
* `colors`: Array of hex color codes for confetti pieces.
* `shapes`: Array of available shapes (circle, square, star).
* `count`: Number of confetti pieces to animate.
* `gravity`: Enable gravity simulation (boolean, default: false).
* `wind`: Simulate wind effect (number, default: 0).

**Contributing**

We welcome contributions to improve this library! Please see the `CONTRIBUTING.md` file for details.

**License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

