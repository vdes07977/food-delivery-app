# 🎯 Architecture & Flow Diagrams

## 1. Application Architecture

```
┌─────────────────────────────────────────────────┐
│                    index.html                   │
│                   (public/index.html)           │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│          Redux Provider (store)                 │
│             (src/index.js)                      │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│                   App.js                        │
│         (Navigation: Menu ↔ Cart)               │
└──────────────────────┬──────────────────────────┘
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
    ┌────────┐  ┌───────────┐  ┌────────────┐
    │ Header │  │ FoodList  │  │   Cart     │
    │        │  │           │  │            │
    │-Count  │  │-FoodItem  │  │-Cart Items │
    │ Badge  │  │ (×6)      │  │-Total Calc │
    └────────┘  └───────────┘  └────────────┘
         │             │             │
         └─────────────┴─────────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │   Redux Store        │
        │  (cartReducer)       │
        │                      │
        │ state.items = []     │
        └──────────────────────┘
```

---

## 2. Redux State Flow

```
┌────────────────────────────────────────┐
│        User Interaction Event          │
│     (Click "Add to Cart" button)       │
└──────────────┬───────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│   Dispatch Action                      │
│   dispatch(addToCart(item))            │
└──────────────┬───────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│   cartActions.js                       │
│   └─> { type: ADD_TO_CART,             │
│         payload: item }                │
└──────────────┬───────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│   cartReducer.js                       │
│   └─> Processes action                 │
│   └─> Updates state                    │
└──────────────┬───────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│   Redux Store Updated                  │
│   {                                    │
│     items: [...prev, newItem]          │
│   }                                    │
└──────────────┬───────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│   useSelector Re-executes              │
│   (Header, Cart components)            │
└──────────────┬───────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│   Components Re-render                 │
│   └─> Header shows new count badge     │
│   └─> Cart shows new items             │
└────────────────────────────────────────┘
```

---

## 3. Component Hierarchy

```
App (Main Container)
│
├─ Header
│  │
│  ├─ App Logo "🍕 Food Delivery"
│  │
│  └─ Cart Count Badge (useSelector)
│     └─ Gets: state.items.length from Redux
│
├─ Navigation Bar
│  ├─ "Menu" Button
│  └─ "Cart" Button
│
└─ Content (Conditional Rendering)
   │
   ├─ FoodList (if activeView === 'foodlist')
   │  │
   │  └─ FoodItem (×6 items from map)
   │     ├─ Food Image (emoji)
   │     ├─ Food Name
   │     ├─ Food Price
   │     ├─ Description
   │     └─ "Add to Cart" Button
   │        └─ Dispatches: dispatch(addToCart(item))
   │
   └─ Cart (if activeView === 'cart')
      │
      ├─ Cart Items List
      │  │
      │  └─ Cart Item (×N items from Redux state)
      │     ├─ Item Image
      │     ├─ Item Name
      │     ├─ Item Price
      │     └─ "Remove" Button
      │        └─ Dispatches: dispatch(removeFromCart(cartId))
      │
      ├─ Total Calculation
      │  └─ Uses reduce(): sum all item.price
      │
      └─ Action Buttons
         ├─ "Clear Cart"
         │  └─ Dispatches: dispatch(clearCart())
         │
         └─ "Proceed to Checkout"
            └─ Alert with total amount
```

---

## 4. Redux Store Structure

```
Redux Store
│
└─ state (cartReducer)
   │
   └─ items: Array<CartItem>
      │
      ├─ [0]: CartItem
      │  ├─ id: 1
      │  ├─ name: "Margherita Pizza"
      │  ├─ price: 250
      │  ├─ image: "🍕"
      │  ├─ description: "Classic Italian pizza..."
      │  └─ cartId: 1711420800000 (unique timestamp)
      │
      ├─ [1]: CartItem
      │  ├─ id: 3
      │  ├─ name: "Creamy Pasta"
      │  ├─ price: 200
      │  ├─ image: "🍝"
      │  ├─ description: "Delicious pasta..."
      │  └─ cartId: 1711420805000
      │
      └─ [N]: CartItem ...
```

---

## 5. User Interaction Flow

```
START
│
├─ User Views Menu Page (FoodList)
│  │
│  ├─ Sees 6 food items in grid
│  ├─ Hovers over FoodItem card
│  │  └─ Card shadow increases, slight upward movement
│  │
│  └─ User clicks "Add to Cart"
│     │
│     └─ Dispatch Action: addToCart(item)
│        │
│        └─ Redux store adds item to state.items
│           │
│           └─ Header useSelector detects change
│              │
│              └─ Cart badge updates with new count
│                 │
│                 └─ Animation on badge
│
├─ User Clicks "Cart" in Navigation
│  │
│  ├─ activeView state changes to 'cart'
│  │
│  └─ Cart component renders
│     │
│     ├─ Maps over Redux state.items
│     │
│     ├─ Displays each item with Remove button
│     │
│     ├─ Calculates total using reduce()
│     │  └─ Total = 250 + 200 = 450
│     │
│     └─ Shows action buttons
│
├─ User Clicks "Remove" on a Cart Item
│  │
│  └─ Dispatch Action: removeFromCart(cartId)
│     │
│     └─ Redux reducer filters item by cartId
│        │
│        └─ useSelector re-runs
│           │
│           └─ Cart re-renders without that item
│
├─ User Clicks "Clear Cart"
│  │
│  └─ Confirmation dialog appears
│     │
│     └─ If confirmed: dispatch(clearCart())
│        │
│        └─ All items removed, empty state shown
│
└─ User Clicks "Proceed to Checkout"
   │
   └─ Alert shows total amount
      │
      └─ Ready for payment (mock)

END
```

---

## 6. Event Handling Flow

```
FoodItem Component
│
├─ Button Click Event
│  └─ onClick={handleAddToCart}
│
└─ handleAddToCart Function
   │
   ├─ const dispatch = useDispatch()
   │
   ├─ Calls: dispatch(addToCart({
   │           id, name, price, image, description
   │         }))
   │
   └─ Redux processes the action
      │
      └─ Component state updates automatically
```

---

## 7. Data Flow: Add to Cart Example

```
┌─────────────────────────────────────────────┐
│ User clicks "Add to Cart" on Pizza          │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ FoodItem.js dispatch(addToCart({            │
│   id: 1,                                    │
│   name: 'Margherita Pizza',                 │
│   price: 250,                               │
│   image: '🍕',                              │
│   description: 'Classic Italian pizza'      │
│ }))                                         │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ cartActions.js returns action object:       │
│ {                                           │
│   type: 'ADD_TO_CART',                      │
│   payload: { id, name, price, ... }        │
│ }                                           │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ cartReducer.js processes action:            │
│                                             │
│ case ADD_TO_CART:                           │
│   return {                                  │
│     items: [...state.items,                 │
│       { ...payload,                         │
│         cartId: Date.now()                  │
│       }]                                    │
│   }                                         │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ Redux Store Updated:                        │
│ {                                           │
│   items: [{                                 │
│     id: 1,                                  │
│     name: 'Margherita Pizza',               │
│     price: 250,                             │
│     image: '🍕',                            │
│     description: 'Classic Italian pizza',   │
│     cartId: 1711420800000                   │
│   }]                                        │
│ }                                           │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ Header.js useSelector detects change:       │
│ const cartItems = useSelector(               │
│   (state) => state.items                    │
│ );                                          │
│                                             │
│ Component re-renders with new count (1)     │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ Displays cart badge: "1"                    │
│ With animation and shadow effect            │
└─────────────────────────────────────────────┘
```

---

## 8. Total Price Calculation

```
const cartItems = [
  { id: 1, name: 'Pizza', price: 250, cartId: 1 },
  { id: 3, name: 'Pasta', price: 200, cartId: 2 },
  { id: 4, name: 'Sandwich', price: 100, cartId: 3 }
];

const totalPrice = cartItems.reduce((total, item) => {
  console.log(`Adding ₹${item.price} to ₹${total}`);
  return total + item.price;
}, 0);

Step-by-step:
1. Initial: total = 0, current item = Pizza (250)
   └─> 0 + 250 = 250

2. Next: total = 250, current item = Pasta (200)
   └─> 250 + 200 = 450

3. Final: total = 450, current item = Sandwich (100)
   └─> 450 + 100 = 550

Result: ₹550
```

---

## 9. Styling Pattern (Inline CSS)

```
const styles = {
  button: {
    background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
  },
  
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)',
  }
};

// Usage
<button
  style={{
    ...styles.button,
    ...(isHovered ? styles.buttonHover : {})
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  Add to Cart
</button>
```

---

## 10. Component Lifecycle

```
Mount Phase
│
├─ FoodItem Component Mounts
│  └─ useState hooks initialize
│  └─ Component renders initial JSX
│
└─ useDispatch() available
   └─ Ready to dispatch actions

Update Phase
│
├─ User clicks "Add to Cart"
│  └─ dispatch(addToCart(...))
│  └─ Redux store updates
│  └─ useSelector detects change in Header
│  └─ Components re-render
│
└─ State updates trigger re-render
   └─ Conditional rendering changes
   └─ Effects run if any

Unmount Phase
│
└─ Component removed from DOM
   └─ Cleanup (if applicable)
```

---

**These diagrams show the complete architecture and data flow of the Food Delivery App!**
