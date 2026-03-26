import React, { useState } from 'react';
import Header from './components/Header';
import FoodList from './components/FoodList';
import Cart from './components/Cart';

// Main App component with navigation between FoodList and Cart
const App = () => {
  // State to manage which view is active (foodlist or cart)
  const [activeView, setActiveView] = useState('foodlist');

  // App inline styles
  const styles = {
    appContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: '#f8f9fa',
    },
    navbar: {
      display: 'flex',
      gap: '20px',
      padding: '16px 30px',
      background: '#ffffff',
      borderBottom: '2px solid #efefef',
      justifyContent: 'center',
    },
    navButton: {
      background: 'none',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#666666',
      borderBottom: '3px solid transparent',
    },
    navButtonActive: {
      color: '#ff6b35',
      borderBottomColor: '#ff6b35',
    },
    content: {
      flex: 1,
    },
  };

  const [navButtonHover, setNavButtonHover] = useState(null);

  return (
    <div style={styles.appContainer}>
      <Header />

      <nav style={styles.navbar}>
        <button
          style={{
            ...styles.navButton,
            ...(activeView === 'foodlist' ? styles.navButtonActive : {}),
            ...(navButtonHover === 'food' ? { color: '#ff6b35' } : {}),
          }}
          onMouseEnter={() => setNavButtonHover('food')}
          onMouseLeave={() => setNavButtonHover(null)}
          onClick={() => setActiveView('foodlist')}
        >
          🍽️ Menu
        </button>
        <button
          style={{
            ...styles.navButton,
            ...(activeView === 'cart' ? styles.navButtonActive : {}),
            ...(navButtonHover === 'cart' ? { color: '#ff6b35' } : {}),
          }}
          onMouseEnter={() => setNavButtonHover('cart')}
          onMouseLeave={() => setNavButtonHover(null)}
          onClick={() => setActiveView('cart')}
        >
          🛒 Cart
        </button>
      </nav>

      <div style={styles.content}>
        {activeView === 'foodlist' ? <FoodList /> : <Cart />}
      </div>
    </div>
  );
};

export default App;
