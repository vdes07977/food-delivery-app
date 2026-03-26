import { createStore } from 'redux';
import { cartReducer } from './cartReducer';

// Create Redux store with cart reducer
export const store = createStore(cartReducer);
