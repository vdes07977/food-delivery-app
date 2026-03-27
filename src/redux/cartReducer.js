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
      const payloadId = action.payload.id;
      
      // Check if item already exists
      const existingItemIndex = state.items.findIndex(item => item.id === payloadId);
      
      if (existingItemIndex !== -1) {
        // Item exists - update it in place with increased quantity
        const newItems = [...state.items];
        const currentItem = newItems[existingItemIndex];
        const currentQty = typeof currentItem.quantity === 'number' ? currentItem.quantity : 1;
        
        newItems[existingItemIndex] = {
          ...currentItem,
          quantity: currentQty + 1,
        };
        
        return {
          ...state,
          items: newItems,
        };
      } else {
        // Item doesn't exist - add new with quantity 1
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
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            const currentQty = typeof item.quantity === 'number' ? item.quantity : 1;
            return { ...item, quantity: currentQty + 1 };
          }
          return item;
        }),
      };
    }

    // Decrease quantity of an item, remove if quantity becomes 0
    case DECREASE_QUANTITY: {
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id === action.payload) {
              const currentQty = typeof item.quantity === 'number' ? item.quantity : 1;
              return { ...item, quantity: Math.max(0, currentQty - 1) };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      };
    }

    // Clear all items from cart
    case CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
    }

    // Return default state
    default:
      return state;
  }
};
