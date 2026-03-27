import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from './cartActions';

// Initial state of the cart
const initialState = {
  items: [],
};

// Reducer function to manage cart state
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add item to cart or increase quantity if already exists
    case ADD_TO_CART:
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If item already exists, increase quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If new item, add it with quantity 1
        return {
          ...state,
          items: [
            ...state.items,
            {
              ...action.payload,
              quantity: 1,
            },
          ],
        };
      }

    // Remove item from cart by id
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    // Increase quantity of an item
    case INCREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    // Decrease quantity of an item, remove if quantity becomes 0
    case DECREASE_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          )
          .filter((item) => item.quantity > 0),
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
