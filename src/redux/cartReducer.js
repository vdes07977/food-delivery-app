import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from './cartActions';

// Initial state of the cart
const initialState = {
  items: [],
};

// Reducer function to manage cart state
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add item to cart or increase quantity if already exists
    case ADD_TO_CART: {
      const itemId = action.payload.id;
      const existingItemIndex = state.items.findIndex((item) => item.id === itemId);
      
      if (existingItemIndex !== -1) {
        // Item exists - increase quantity
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: (newItems[existingItemIndex].quantity || 1) + 1,
        };
        return { ...state, items: newItems };
      } else {
        // New item - add with quantity 1
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
    }

    // Remove item from cart by id
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    // Increase quantity of an item
    case INCREASE_QUANTITY: {
      const newItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      return { ...state, items: newItems };
    }

    // Decrease quantity of an item, remove if quantity becomes 0
    case DECREASE_QUANTITY: {
      const newItems = state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(0, (item.quantity || 1) - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
      return { ...state, items: newItems };
    }

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
