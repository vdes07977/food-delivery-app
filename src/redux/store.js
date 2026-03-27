import { createStore } from 'redux';
import { cartReducer } from './cartReducer';

// Load initial state from localStorage or use empty
const loadInitialState = () => {
  try {
    // Clear old cart cache completely
    localStorage.removeItem('cart');
    localStorage.removeItem('fooddel_cart');
    
    return { items: [] };
  } catch (error) {
    console.error('Error initializing cart:', error);
  }
  return { items: [] };
};

// Create Redux store with cart reducer
export const store = createStore(
  cartReducer,
  loadInitialState()
);

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('fooddel_cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
});
