import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/cartActions';

// Cart component to display cart items and total price
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.items);

  // Normalize cart items to ensure they have quantity property
  const normalizedItems = cartItems.map((item) => ({
    ...item,
    quantity: item.quantity || 1,
  }));

  // Calculate total price using reduce (price * quantity)
  const totalPrice = normalizedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Calculate total quantity
  const totalItems = normalizedItems.reduce((total, item) => total + item.quantity, 0);

  // Handle remove item from cart
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // Handle increase quantity
  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  // Handle decrease quantity
  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  // Handle clear entire cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  // Cart inline styles for professional appearance
  const styles = {
    container: {
      padding: '40px 20px',
      background: '#f8f9fa',
      minHeight: '60vh',
    },
    wrapper: {
      maxWidth: '900px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1a1a1a',
    },
    emptyCart: {
      textAlign: 'center',
      padding: '60px 20px',
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    emptyIcon: {
      fontSize: '60px',
      marginBottom: '16px',
    },
    emptyText: {
      fontSize: '18px',
      color: '#666666',
    },
    cartList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#ffffff',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
    },
    cartItemHover: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transform: 'translateX(4px)',
    },
    itemInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flex: 1,
    },
    itemImage: {
      fontSize: '32px',
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1a1a1a',
      marginBottom: '4px',
    },
    itemPrice: {
      fontSize: '14px',
      color: '#ff6b35',
      fontWeight: '600',
    },
    quantitySection: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: '#f5f5f5',
      borderRadius: '6px',
      padding: '4px 8px',
    },
    quantityButton: {
      background: '#ff6b35',
      color: '#ffffff',
      border: 'none',
      width: '28px',
      height: '28px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    },
    quantityButtonHover: {
      background: '#e55100',
      transform: 'scale(1.1)',
    },
    quantityDisplay: {
      minWidth: '30px',
      textAlign: 'center',
      fontWeight: '600',
      color: '#1a1a1a',
      fontSize: '14px',
    },
    removeButton: {
      background: '#ff6b35',
      color: '#ffffff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '12px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 6px rgba(255, 107, 53, 0.3)',
    },
    removeButtonHover: {
      background: '#e55100',
      boxShadow: '0 4px 10px rgba(255, 107, 53, 0.4)',
    },
    footer: {
      marginTop: '30px',
      background: '#ffffff',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    totalSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid #efefef',
      paddingBottom: '16px',
      marginBottom: '16px',
    },
    totalLabel: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a1a1a',
    },
    totalPrice: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#ff6b35',
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
    },
    clearButton: {
      background: '#ffffff',
      color: '#ff6b35',
      border: '2px solid #ff6b35',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.3s ease',
    },
    clearButtonHover: {
      background: '#fff5f0',
    },
    checkoutButton: {
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      color: '#ffffff',
      border: 'none',
      padding: '12px 28px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
    },
    checkoutButtonHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 16px rgba(255, 107, 53, 0.4)',
    },
  };

  const [hoveredItemId, setHoveredItemId] = React.useState(null);
  const [hoveredButtonType, setHoveredButtonType] = React.useState(null);
  const [hoveredQtyButton, setHoveredQtyButton] = React.useState(null);

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <h2 style={styles.title}>Your Cart</h2>
          <div style={styles.emptyCart}>
            <div style={styles.emptyIcon}>🛒</div>
            <p style={styles.emptyText}>Your cart is empty. Start adding some delicious food!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h2 style={styles.title}>Your Cart</h2>
          <span style={{ fontSize: '14px', color: '#666666' }}>
            {normalizedItems.length} item{normalizedItems.length !== 1 ? 's' : ''} ({totalItems} total)
          </span>
        </div>

        <div style={styles.cartList}>
          {normalizedItems.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.cartItem,
                ...(hoveredItemId === item.id ? styles.cartItemHover : {}),
              }}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
            >
              <div style={styles.itemInfo}>
                <span style={styles.itemImage}>{item.image}</span>
                <div style={styles.itemDetails}>
                  <p style={styles.itemName}>{item.name}</p>
                  <p style={styles.itemPrice}>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={styles.quantitySection}>
                  <button
                    style={{
                      ...styles.quantityButton,
                      ...(hoveredQtyButton === `${item.id}-minus` ? styles.quantityButtonHover : {}),
                    }}
                    onMouseEnter={() => setHoveredQtyButton(`${item.id}-minus`)}
                    onMouseLeave={() => setHoveredQtyButton(null)}
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    −
                  </button>
                  <span style={styles.quantityDisplay}>{item.quantity}</span>
                  <button
                    style={{
                      ...styles.quantityButton,
                      ...(hoveredQtyButton === `${item.id}-plus` ? styles.quantityButtonHover : {}),
                    }}
                    onMouseEnter={() => setHoveredQtyButton(`${item.id}-plus`)}
                    onMouseLeave={() => setHoveredQtyButton(null)}
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  style={{
                    ...styles.removeButton,
                    ...(hoveredButtonType === item.id ? styles.removeButtonHover : {}),
                  }}
                  onMouseEnter={() => setHoveredButtonType(item.id)}
                  onMouseLeave={() => setHoveredButtonType(null)}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.footer}>
          <div style={styles.totalSection}>
            <span style={styles.totalLabel}>Total Amount:</span>
            <span style={styles.totalPrice}>₹{totalPrice}</span>
          </div>

          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.clearButton,
                ...(hoveredButtonType === 'clear' ? styles.clearButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButtonType('clear')}
              onMouseLeave={() => setHoveredButtonType(null)}
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              style={{
                ...styles.checkoutButton,
                ...(hoveredButtonType === 'checkout' ? styles.checkoutButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButtonType('checkout')}
              onMouseLeave={() => setHoveredButtonType(null)}
              onClick={() => alert(`Proceeding to checkout with total: ₹${totalPrice}`)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
