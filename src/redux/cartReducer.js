import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from './cartActions';

// Initial state of the cart
const initialState = {
  items: [],
};

// Consolidate items by ID - ensures no duplicates
const consolidateItems = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const id = item.id;
    if (map.has(id)) {
      const existing = map.get(id);
      existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
    } else {
      map.set(id, { ...item, quantity: item.quantity || 1 });
    }
  });
  return Array.from(map.values());
};

// Reducer function to manage cart state
export const cartReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    // Add item to cart or increase quantity if already exists
    case ADD_TO_CART: {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        // Item exists - increase quantity
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      } else {
        // New item - add with quantity 1
        newState = {
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
      break;
    }

    // Remove item from cart by id
    case REMOVE_FROM_CART: {
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
      break;
    }

    // Increase quantity of an item
    case INCREASE_QUANTITY: {
      newState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      };
      break;
    }

    // Decrease quantity of an item, remove if quantity becomes 0
    case DECREASE_QUANTITY: {
      newState = {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(0, (item.quantity || 1) - 1) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
      break;
    }

    // Clear all items from cart
    case CLEAR_CART: {
      newState = {
        ...state,
        items: [],
      };
      break;
    }

    // Return default state
    default:
      return state;
  }

  // Always consolidate items after EVERY action to prevent duplicates
  return {
    ...newState,
    items: consolidateItems(newState.items),
  };
};
