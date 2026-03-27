import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from './cartActions';

// Initial state of the cart
const initialState = {
  items: [],
};

// Helper: Consolidate items using Map (100% bulletproof)
const consolidate = (items) => {
  console.log('CONSOLIDATING - Input items:', items);
  
  const map = new Map();
  
  items.forEach(item => {
    const id = item.id;
    console.log(`Processing item id=${id}, current quantity=${item.quantity || 1}`);
    
    if (map.has(id)) {
      const existing = map.get(id);
      const newQty = (existing.quantity || 1) + (item.quantity || 1);
      console.log(`Item ${id} already exists! Old qty=${existing.quantity || 1}, adding ${item.quantity || 1}, new qty=${newQty}`);
      
      existing.quantity = newQty;
    } else {
      console.log(`Item ${id} is NEW, setting quantity to ${item.quantity || 1}`);
      map.set(id, {
        ...item,
        quantity: item.quantity || 1,
      });
    }
  });
  
  const result = Array.from(map.values());
  console.log('CONSOLIDATED RESULT:', result);
  return result;
};

// Reducer function to manage cart state
export const cartReducer = (state = initialState, action) => {
  console.log(`\n=== REDUCER ACTION: ${action.type} ===`);
  console.log('Payload:', action.payload);
  console.log('Current state items:', state.items);
  
  let newItems = [...state.items];

  switch (action.type) {
    case ADD_TO_CART:
      console.log('ADD_TO_CART: Pushing new item');
      newItems.push({
        ...action.payload,
        quantity: 1,
      });
      console.log('Items after push:', newItems);
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
  const consolidated = consolidate(newItems);
  const finalState = {
    ...state,
    items: consolidated,
  };
  
  console.log('FINAL STATE ITEMS:', finalState.items);
  console.log(`=== END ACTION: ${action.type} ===\n`);
  
  return finalState;
};
