import { createStore } from 'redux';
import { cartReducer } from './cartReducer';

// Load initial state from localStorage or use empty
const loadInitialState = () => {
  try {
    const savedCart = localStorage.getItem('fooddel_cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      // Normalize items: ensure all have quantity property
      if (parsed.items && Array.isArray(parsed.items)) {
        parsed.items = parsed.items.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
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
