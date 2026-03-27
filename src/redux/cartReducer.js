import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from './cartActions';

// Initial state of the cart
const initialState = {
  items: [],
};

// Helper function to normalize items (ensure they have quantity property)
const normalizeItems = (items) => {
  return items.map((item) => ({
    ...item,
    quantity: item.quantity || 1,
  }));
};

// Reducer function to manage cart state
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add item to cart or increase quantity if already exists
    case ADD_TO_CART:
      const normalizedItems = normalizeItems(state.items);
      const existingItem = normalizedItems.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If item already exists, increase quantity
        return {
          ...state,
          items: normalizedItems.map((item) =>
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
            ...normalizedItems,
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
    case INCREASE_QUANTITY: {
      const itemsForIncrease = normalizeItems(state.items);
      return {
        ...state,
        items: itemsForIncrease.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    // Decrease quantity of an item, remove if quantity becomes 0
    case DECREASE_QUANTITY: {
      const itemsForDecrease = normalizeItems(state.items);
      return {
        ...state,
        items: itemsForDecrease
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    // Clear all items from cart
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    // Return default state with normalized items
    default:
      return {
        ...state,
        items: normalizeItems(state.items),
      };
  }
};
