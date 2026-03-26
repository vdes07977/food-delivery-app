import React from 'react';
import FoodItem from './FoodItem';

// Static food items data
const FOOD_ITEMS = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 250,
    image: '🍕',
    description: 'Classic Italian pizza with fresh mozzarella',
  },
  {
    id: 2,
    name: 'Burger Deluxe',
    price: 150,
    image: '🍔',
    description: 'Juicy beef patty with fresh vegetables',
  },
  {
    id: 3,
    name: 'Creamy Pasta',
    price: 200,
    image: '🍝',
    description: 'Delicious pasta in creamy white sauce',
  },
  {
    id: 4,
    name: 'Gourmet Sandwich',
    price: 100,
    image: '🥪',
    description: 'Fresh bread with premium fillings',
  },
  {
    id: 5,
    name: 'Spicy Biryani',
    price: 180,
    image: '🍚',
    description: 'Aromatic rice with tender meat',
  },
  {
    id: 6,
    name: 'Cheesy Tacos',
    price: 120,
    image: '🌮',
    description: 'Crunchy shells with melted cheese',
  },
];

// FoodList component to display all food items in a grid
const FoodList = () => {
  const styles = {
    container: {
      padding: '40px 20px',
      background: '#f8f9fa',
      minHeight: 'calc(100vh - 80px)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1a1a1a',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#666666',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Our Delicious Menu</h2>
        <p style={styles.subtitle}>Choose from our wide variety of fresh and delicious food</p>
      </div>

      <div style={styles.grid}>
        {FOOD_ITEMS.map((item) => (
          <FoodItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodList;
