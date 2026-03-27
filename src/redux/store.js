import { createStore } from 'redux';
import { cartReducer } from './cartReducer';

// Create Redux store with cart reducer - SIMPLE, NO PERSISTENCE
export const store = createStore(cartReducer);

// Optional: Log store changes for debugging
store.subscribe(() => {
  const state = store.getState();
  console.log('Cart state updated:', state);
});
