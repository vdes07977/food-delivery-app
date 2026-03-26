# Food Delivery App - Professional React Application

A modern, professional Food Delivery App built with **React** and **Redux**. This application demonstrates best practices in component architecture, state management, and professional UI design using inline CSS.

## 🎯 Features

- **Professional UI Design**: Modern gradient-based design with smooth animations
- **Redux State Management**: Centralized cart state management with Redux
- **Responsive Grid Layout**: Food items displayed in a responsive grid
- **Add/Remove Items**: Add items to cart and remove them individually
- **Cart Management**: View cart items, calculate total price, and clear cart
- **Dynamic Cart Count**: Real-time cart item count in the header
- **Navigation**: Easy switching between Menu and Cart views
- **Hover Effects**: Interactive UI elements with smooth transitions

## 📁 Project Structure

```
fooddel2/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── Header.js           # Header with app name and cart count
│   │   ├── FoodItem.js         # Individual food item card component
│   │   ├── FoodList.js         # Food items grid display
│   │   └── Cart.js             # Cart view with items and total
│   ├── redux/
│   │   ├── cartActions.js      # Redux action creators
│   │   ├── cartReducer.js      # Redux reducer for cart state
│   │   └── store.js            # Redux store configuration
│   ├── App.js                  # Main app component with navigation
│   └── index.js                # React entry point with Redux Provider
├── webpack.config.js           # Webpack configuration
├── .babelrc                    # Babel configuration for JSX transpilation
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project**:
```bash
cd fooddel2
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

### Available Scripts

- **`npm start`** - Start development server with hot reload
- **`npm run dev`** - Alternative way to start dev server
- **`npm run build`** - Build optimized production bundle

## 🎨 Technical Implementation

### Redux Setup

**Action Types & Creators** (`src/redux/cartActions.js`):
- `ADD_TO_CART`: Add item to cart
- `REMOVE_FROM_CART`: Remove item by cartId
- `CLEAR_CART`: Clear entire cart

**Reducer** (`src/redux/cartReducer.js`):
```javascript
// State structure
{
  items: [
    { id, name, price, image, description, cartId }
  ]
}
```

**Store** (`src/redux/store.js`):
- Single Redux store with cartReducer

### Component Architecture

**Header Component**:
- Displays app branding
- Shows dynamic cart item count using Redux
- Gradient orange background with shadow effects

**FoodItem Component**:
- Individual food card with image, name, price, description
- Add to Cart button dispatches Redux action
- Hover effects with transform animations

**FoodList Component**:
- Displays 6 food items in responsive grid
- Uses `map()` to render FoodItem components
- CSS Grid layout that adapts to screen size

**Cart Component**:
- Displays all cart items
- Remove button for each item (uses cartId)
- Total price calculation using `reduce()`
- Clear cart and checkout actions
- Empty state handling

**App Component**:
- Main navigation between Menu and Cart
- State management for active view
- Navigation button styling and transitions

### Styling Approach

All components use **inline CSS** with:
- CSS-in-JS objects for all styling
- Gradient backgrounds (`linear-gradient`)
- Box shadows for depth
- Smooth transitions (`cubic-bezier` timing)
- Hover state effects using React state
- Professional color scheme (Orange `#ff6b35` primary)

### Key Hooks Used

- **`useState`**: For managing hover states and view navigation
- **`useSelector`**: For accessing Redux cart state
- **`useDispatch`**: For dispatching Redux actions

### Important Functions

**Total Price Calculation** (Cart.js):
```javascript
const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
```

**Cart Item Filtering** (cartReducer.js):
```javascript
items: state.items.filter((item) => item.cartId !== action.payload)
```

**Unique Cart ID**:
```javascript
cartId: Date.now() // Unique ID for each cart entry
```

## 🎨 Design Highlights

### Color Scheme
- **Primary Orange**: `#ff6b35` - Call-to-action buttons and accents
- **Secondary Orange**: `#f7931e` - Gradients and hover states
- **Dark Text**: `#1a1a1a` - Main content
- **Light Gray**: `#f8f9fa` - Backgrounds
- **Medium Gray**: `#666666` - Secondary text
- **Alert Red**: `#d32f2f` - Cart badge

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI)
- **Font Sizes**: 12px to 32px depending on context
- **Font Weights**: 600-700 for headings, 600 for buttons

### Effects
- **Shadows**: Multi-layered shadows for depth
- **Transitions**: 0.3s cubic-bezier for smooth animations
- **Transforms**: Scale and translateY for interactive elements
- **Gradients**: Linear gradients for headers and buttons

## 📊 Data Structure

### Food Items
```javascript
{
  id: number,
  name: string,
  price: number,
  image: emoji,
  description: string
}
```

### Cart Item (Redux State)
```javascript
{
  id: number,           // Original food item ID
  name: string,
  price: number,
  image: emoji,
  description: string,
  cartId: number        // Unique timestamp for removal
}
```

## 🔄 Data Flow

1. **User adds item**: Click "Add to Cart" button on FoodItem
2. **Dispatch action**: `addToCart(item)` sent to Redux
3. **Update state**: Reducer adds item to `state.items` with unique `cartId`
4. **Re-render**: Components subscribing to Redux state update
5. **Display**: Cart shows item and Header shows updated count

## 🛠️ Customization

### Adding New Food Items
Edit the `FOOD_ITEMS` array in `src/components/FoodList.js`:

```javascript
const FOOD_ITEMS = [
  {
    id: 7,
    name: 'New Item',
    price: 200,
    image: '🍗',
    description: 'Description here'
  },
  // ... more items
];
```

### Changing Colors
Update the color values in component styles:

```javascript
const styles = {
  container: {
    background: 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)',
  }
};
```

### Adjusting Grid Layout
Modify the grid template in `FoodList.js`:

```javascript
gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', // Change minmax value
```

## 📦 Dependencies

### Production
- **react** (^19.2.4) - UI library
- **react-dom** (^19.2.4) - React DOM rendering
- **redux** (^5.0.1) - State management
- **react-redux** (^9.2.0) - React bindings for Redux

### Development
- **webpack** - Module bundler
- **webpack-cli** - Webpack command line
- **webpack-dev-server** - Development server
- **@babel/core** - JavaScript compiler
- **@babel/preset-env** - Babel preset for modern JavaScript
- **@babel/preset-react** - Babel preset for React
- **babel-loader** - Webpack loader for Babel
- **css-loader** - Webpack loader for CSS
- **style-loader** - Webpack loader for styles
- **html-webpack-plugin** - HTML generation plugin

## 🐛 Debugging Tips

1. **Redux DevTools**: Install Redux DevTools browser extension to inspect state
2. **React DevTools**: Use React DevTools to inspect components
3. **Console Logs**: Add console.log in selectors to debug state
4. **Breakpoints**: Use browser DevTools to set breakpoints

## 🚀 Performance Optimization

- **Webpack bundling**: Minifies and splits code in production
- **Lazy rendering**: Map functions render only visible items
- **CSS-in-JS**: No external CSS files to load
- **Memoization ready**: Components can be wrapped with React.memo if needed

## 📱 Responsive Design

The app is responsive with:
- **Flexible grid**: Uses `minmax()` for responsive columns
- **Viewport meta tag**: Proper scaling on mobile
- **Touch-friendly buttons**: Adequate button sizes
- **Flexible padding**: Responsive padding values

## 📝 Code Quality

- **Clean components**: Single responsibility principle
- **Prop drilling minimized**: Redux for state management
- **Proper naming**: Descriptive function and variable names
- **Comments**: Inline comments explaining complex logic
- **Consistent styling**: Unified design patterns

## 🎓 Learning Concepts

This project teaches:
- React functional components
- Redux fundamentals (actions, reducers, store)
- React hooks (useState, useSelector, useDispatch)
- CSS-in-JS styling
- Component composition
- Props passing
- Event handling
- Array methods (map, filter, reduce)
- Webpack and Babel configuration

## 📄 License

ISC

## 👨‍💻 Author

Food Delivery App Team

---

**Happy Coding! 🚀 Enjoy your professional Food Delivery App!**
