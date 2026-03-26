# 📋 Complete Code Reference - Food Delivery App

## Project Overview

✅ **Framework**: React 19 + Redux  
✅ **Styling**: Inline CSS (CSS-in-JS)  
✅ **Bundler**: Webpack + Babel  
✅ **State**: Redux with React-Redux  
✅ **Features**: Add/Remove items, Cart management, Total calculation  

---

## 1️⃣ Redux Setup Files

### `src/redux/cartActions.js` - Action Creators
Defines Redux actions for cart operations.

**Actions**:
- `ADD_TO_CART`: Adds new item to cart
- `REMOVE_FROM_CART`: Removes item by cartId
- `CLEAR_CART`: Clears all items

---

### `src/redux/cartReducer.js` - Reducer Logic
Handles state updates for all cart actions.

**State Structure**:
```javascript
{
  items: [
    { id, name, price, image, description, cartId }
  ]
}
```

**Key Logic**:
- ADD: Spreads new item with unique `Date.now()` cartId
- REMOVE: Filters items by cartId
- CLEAR: Returns empty items array

---

### `src/redux/store.js` - Store Configuration
Creates Redux store with cartReducer.

---

## 2️⃣ Component Files

### `src/components/Header.js` - Header Component

**Features**:
- ✅ Gradient orange background
- ✅ App name "Food Delivery" with emoji
- ✅ Dynamic cart count badge (useSelector)
- ✅ Sticky positioning
- ✅ Professional shadow effects

**Key Props**: None (uses Redux)  
**Styling**: Gradient, shadows, badges

---

### `src/components/FoodItem.js` - Food Card Component

**Features**:
- ✅ Food item card with image (emoji)
- ✅ Name, price, description
- ✅ "Add to Cart" button
- ✅ Hover animations (scale, shadow)
- ✅ "Fresh" badge on card
- ✅ Dispatches ADD_TO_CART action

**Props**: id, name, price, image, description  
**Styling**: Card shadow, hover transform, gradient button

---

### `src/components/FoodList.js` - Menu Grid Component

**Features**:
- ✅ Displays 6 static food items
- ✅ Responsive grid layout (auto-fill, minmax)
- ✅ Maps over FOOD_ITEMS array
- ✅ Section header with subtitle
- ✅ Light gray background

**Key Data**: FOOD_ITEMS array with 6 items  
**Styling**: CSS Grid, responsive columns

**Food Items**:
1. Margherita Pizza - ₹250
2. Burger Deluxe - ₹150
3. Creamy Pasta - ₹200
4. Gourmet Sandwich - ₹100
5. Spicy Biryani - ₹180
6. Cheesy Tacos - ₹120

---

### `src/components/Cart.js` - Cart Management Component

**Features**:
- ✅ Displays all cart items
- ✅ Item card with name, price, image
- ✅ Remove button per item (uses cartId)
- ✅ Total price using reduce()
- ✅ Clear Cart button with confirmation
- ✅ Checkout button
- ✅ Empty state message
- ✅ Item count display
- ✅ Hover effects on items and buttons

**Key Functions**:
```javascript
// Total calculation
const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

// Remove item
dispatch(removeFromCart(cartId));

// Clear cart
dispatch(clearCart());
```

---

## 3️⃣ Main App Files

### `src/App.js` - Main Component

**Features**:
- ✅ Navigation between Menu and Cart views
- ✅ useState for activeView state
- ✅ Navigation buttons with active styling
- ✅ Conditional rendering of FoodList/Cart
- ✅ Hover effects on nav buttons

**State**:
```javascript
const [activeView, setActiveView] = useState('foodlist');
```

**Navigation**: Menu (FoodList) | Cart (Cart)

---

### `src/index.js` - React Entry Point

**Features**:
- ✅ Redux Provider wraps entire app
- ✅ Global CSS styles injected
- ✅ ReactDOM rendering to #root
- ✅ React.StrictMode enabled
- ✅ Custom scrollbar styling

---

## 4️⃣ Configuration Files

### `webpack.config.js` - Webpack Configuration
- Entry: `src/index.js`
- Output: `dist/bundle.js`
- Dev server: Port 3000, hot reload
- Babel loader for JSX
- CSS loaders
- HTML plugin for index.html
- Source maps for debugging

---

### `.babelrc` - Babel Configuration
Transpiles JSX and modern JavaScript:
- `@babel/preset-env`: Modern JS features
- `@babel/preset-react`: JSX syntax

---

### `public/index.html` - HTML Entry Point
- Semantic HTML5
- Viewport meta tag for mobile
- Root div with id="root"
- Loading spinner message
- Global CSS in `<style>`

---

## 5️⃣ Package Management

### `package.json` - Dependencies & Scripts

**Dependencies**:
- react (UI library)
- react-dom (DOM rendering)
- redux (state management)
- react-redux (Redux bindings)

**Dev Dependencies**:
- webpack (bundler)
- babel (transpiler)
- loaders (css, style, babel)
- html-webpack-plugin

**Scripts**:
- `npm start` → `webpack serve --mode development`
- `npm run dev` → Same as start
- `npm run build` → Production bundle

---

## 6️⃣ Color Scheme & Design

### Primary Colors
- **Orange**: `#ff6b35` - CTAs, badges, accents
- **Light Orange**: `#f7931e` - Gradients, hover states
- **Dark**: `#1a1a1a` - Text
- **Light**: `#f8f9fa` - Backgrounds
- **Gray**: `#666666` - Secondary text
- **Red**: `#d32f2f` - Alert badge

### Styling Patterns
- **Gradients**: Linear gradients (135deg)
- **Shadows**: 4px, 12px variations
- **Transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Transforms**: Scale(1.05), translateY(-8px)
- **Border Radius**: 6-12px for rounded corners

---

## 7️⃣ Data Flow Diagram

```
User Click (Add to Cart)
        ↓
FoodItem Component
        ↓
dispatch(addToCart(item))
        ↓
cartActions.js (ADD_TO_CART)
        ↓
cartReducer.js (ADD to items array)
        ↓
Redux Store Updated
        ↓
Header re-renders (useSelector)
        ↓
Cart Count Badge Updates ✅
```

---

## 8️⃣ Key Technologies

| Technology | Purpose |
|-----------|---------|
| React 19 | UI components |
| Redux | State management |
| React-Redux | Connect React to Redux |
| Webpack | Module bundler |
| Babel | JSX/ES6 transpiler |
| CSS-in-JS | Inline styling |

---

## 9️⃣ Project Stats

- **Total Files**: 12 (components, config, Redux)
- **React Components**: 5 (App, Header, FoodItem, FoodList, Cart)
- **Redux Files**: 3 (actions, reducer, store)
- **Lines of Code**: ~800+ (clean, commented)
- **Bundle Size**: ~100KB (before gzip)
- **Food Items**: 6 static items

---

## 🔟 How to Extend

### Add a New Food Item
```javascript
// In FoodList.js FOOD_ITEMS
{
  id: 7,
  name: 'Grilled Chicken',
  price: 220,
  image: '🍗',
  description: 'Juicy grilled chicken'
}
```

### Add a New Action
```javascript
// In cartActions.js
export const updateQuantity = (cartId, quantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: { cartId, quantity }
});
```

### Add Local Storage
```javascript
// In cartReducer.js - after each action
localStorage.setItem('cart', JSON.stringify(state));

// Initialize in store.js
const savedCart = localStorage.getItem('cart');
const initialState = savedCart ? JSON.parse(savedCart) : { items: [] };
```

---

## 🚀 Quick Commands

```bash
# Install & Start
npm install
npm start

# Build for production
npm run build

# Dev with different port
# Edit webpack.config.js port: 3001
```

---

**All code is clean, commented, and beginner-friendly! 🎓**
