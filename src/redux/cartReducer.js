import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './cartActions';

// Initial state of the cart
const initialState = {
  items: [],
};

// Reducer function to manage cart state
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add item to cart with unique ID based on timestamp
    case ADD_TO_CART:
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            cartId: Date.now(), // Unique ID for each cart item
          },
        ],
      };

    // Remove item from cart by cartId
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.cartId !== action.payload),
      };

    // Clear all items from cart
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    // Return default state
    default:
      return state;
  }
};
