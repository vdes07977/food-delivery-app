import React from 'react';
import { useSelector } from 'react-redux';

// Header component with app branding and cart count
const Header = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.items);
  // Calculate total quantity of all items in cart
  const cartCount = cartItems.reduce((total, item) => {
    const qty = typeof item.quantity === 'number' ? item.quantity : 1;
    return total + qty;
  }, 0);

  // Header inline styles for professional appearance
  const headerStyles = {
    container: {
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      color: '#ffffff',
      padding: '20px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    logo: {
      fontSize: '28px',
      fontWeight: '700',
      letterSpacing: '1px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoIcon: {
      fontSize: '32px',
    },
    cartSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    cartIcon: {
      fontSize: '28px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    cartBadge: {
      background: '#d32f2f',
      color: '#ffffff',
      borderRadius: '50%',
      width: '28px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '700',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    },
    tagline: {
      fontSize: '12px',
      opacity: 0.9,
      fontStyle: 'italic',
    },
  };

  return (
    <header style={headerStyles.container}>
      <div style={headerStyles.logo}>
        <span style={headerStyles.logoIcon}>🍕</span>
        <div>
          <div>Food Delivery</div>
          <div style={headerStyles.tagline}>Fresh & Fast</div>
        </div>
      </div>

      <div style={headerStyles.cartSection}>
        <span style={headerStyles.cartIcon}>🛒</span>
        {cartCount > 0 && (
          <span style={headerStyles.cartBadge}>{cartCount}</span>
        )}
      </div>
    </header>
  );
};

export default Header;
