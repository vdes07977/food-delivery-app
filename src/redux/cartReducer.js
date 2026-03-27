import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from './cartActions';

// Initial state of the cart
const initialState = {
  items: [],
};

// Helper: Consolidate items using Map (100% bulletproof)
const consolidate = (items) => {
  const map = new Map();
  
  items.forEach(item => {
    const id = item.id;
    if (map.has(id)) {
      const existing = map.get(id);
      existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
    } else {
      map.set(id, {
        ...item,
        quantity: item.quantity || 1,
      });
    }
  });
  
  return Array.from(map.values());
};

// Reducer function to manage cart state
export const cartReducer = (state = initialState, action) => {
  let newItems = [...state.items];

  switch (action.type) {
    case ADD_TO_CART:
      newItems.push({
        ...action.payload,
        quantity: 1,
      });
      break;

    case REMOVE_FROM_CART:
      newItems = newItems.filter(item => item.id !== action.payload);
      break;

    case INCREASE_QUANTITY:
      newItems = newItems.map(item =>
        item.id === action.payload
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      break;

    case DECREASE_QUANTITY:
      newItems = newItems
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(0, (item.quantity || 1) - 1) }
            : item
        )
        .filter(item => item.quantity > 0);
      break;

    case CLEAR_CART:
      newItems = [];
      break;

    default:
      return state;
  }

  // ALWAYS consolidate after any action - this is key!
  return {
    ...state,
    items: consolidate(newItems),
  };
};
