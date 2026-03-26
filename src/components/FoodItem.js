import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartActions';

// Individual food item card component
const FoodItem = ({ id, name, price, image, description }) => {
  const dispatch = useDispatch();

  // Handle add to cart action
  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image, description }));
  };

  // FoodItem card inline styles for professional appearance
  const styles = {
    card: {
      background: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    cardHover: {
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-8px)',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: '180px',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #efefef 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '60px',
      overflow: 'hidden',
    },
    badge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: '#ff6b35',
      color: '#ffffff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
    },
    content: {
      padding: '16px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    name: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1a1a1a',
      marginBottom: '6px',
    },
    description: {
      fontSize: '12px',
      color: '#666666',
      marginBottom: '12px',
      lineHeight: '1.4',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    },
    price: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#ff6b35',
    },
    button: {
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      color: '#ffffff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '12px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
    },
    buttonHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)',
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <span>{image}</span>
        <span style={styles.badge}>Fresh</span>
      </div>

      <div style={styles.content}>
        <h3 style={styles.name}>{name}</h3>
        <p style={styles.description}>{description}</p>

        <div style={styles.footer}>
          <span style={styles.price}>₹{price}</span>
          <button
            style={{
              ...styles.button,
              ...(isButtonHovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
