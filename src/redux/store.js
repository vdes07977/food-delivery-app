import { createStore } from 'redux';
import { cartReducer } from './cartReducer';

// Function to consolidate items (remove duplicates by ID)
const consolidateItems = (items) => {
  const consolidated = {};
  items.forEach((item) => {
    if (consolidated[item.id]) {
      consolidated[item.id].quantity += (item.quantity || 1);
    } else {
      consolidated[item.id] = {
        ...item,
        quantity: item.quantity || 1,
      };
    }
  });
  return Object.values(consolidated);
};

// Load initial state from localStorage or use empty
const loadInitialState = () => {
  try {
    // Clear old cart keys completely
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

// Subscribe to store changes and save to localStorage with consolidation
store.subscribe(() => {
  const state = store.getState();
  try {
    // Consolidate items before saving (ensure no duplicates)
    const consolidatedState = {
      ...state,
      items: consolidateItems(state.items),
    };
    localStorage.setItem('fooddel_cart', JSON.stringify(consolidatedState));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
});
