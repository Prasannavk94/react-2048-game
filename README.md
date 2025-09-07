# 2048 Game

A fully functional 2048 game built with React! This is a classic sliding tile puzzle game where you combine tiles to reach the 2048 tile.

## Features

- **Complete Game Logic**: Full 2048 game implementation with proper tile merging
- **Responsive Design**: Works on desktop and mobile devices
- **Touch Support**: Swipe gestures for mobile gameplay
- **Keyboard Controls**: Arrow keys for desktop gameplay
- **Score Tracking**: Current score and best score with local storage
- **Beautiful UI**: Modern, polished interface with smooth animations
- **Game States**: Win detection, game over handling, and continue playing options

## How to Play

1. **Objective**: Combine tiles to reach the 2048 tile
2. **Controls**: 
   - **Desktop**: Use arrow keys (↑ ↓ ← →)
   - **Mobile**: Swipe in any direction
3. **Rules**: 
   - Tiles slide in the direction you choose
   - Same-value tiles merge when they collide
   - A new tile (2 or 4) appears after each move
   - Game ends when no more moves are possible

## Game Features

- **Score System**: Earn points for each tile merge
- **Best Score**: Automatically saved to local storage
- **New Game**: Reset and start over anytime
- **Win Detection**: Get notified when you reach 2048
- **Continue Playing**: Keep playing after winning to achieve higher scores

## Technologies Used

- React 18
- CSS3 with modern features
- Local Storage for persistence
- Responsive design principles
- Touch event handling

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd 2048-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
2048-game/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main game component
│   ├── App.css         # Game styles
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## Game Logic

The game implements the classic 2048 algorithm:
- **Board**: 4x4 grid
- **Tile Generation**: 90% chance for 2, 10% chance for 4
- **Movement**: Tiles slide and merge in the chosen direction
- **Scoring**: Points awarded for each successful merge
- **Win Condition**: Reaching the 2048 tile
- **Game Over**: No valid moves remaining

## Customization

You can easily customize the game by modifying:
- **Colors**: Update the `getTileColor` function in `App.js`
- **Board Size**: Change the grid dimensions (requires logic updates)
- **Win Condition**: Modify the target tile value
- **Styling**: Update CSS variables and classes

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers with touch support

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the game!

---

Enjoy playing 2048! 🎮
