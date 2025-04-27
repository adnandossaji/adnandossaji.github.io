import React, { useState, useEffect } from 'react';

function SimpleCounter({ componentId }) {
  const [count, setCount] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);

  // Indicate when the component script has run and hydration likely occurred
  useEffect(() => {
    console.log(`Counter Component (${componentId}) hydrated/mounted.`);
    setIsInteractive(true);
    // Simulate indicator light turning green
    const indicator = document.getElementById(`${componentId}-indicator`);
    if (indicator) {
      indicator.style.backgroundColor = '#4ade80'; // green-400
      indicator.textContent = 'Interactive';
    }
  }, [componentId]);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const buttonStyle = {
    padding: '8px 15px',
    fontSize: '1rem',
    cursor: isInteractive ? 'pointer' : 'not-allowed',
    backgroundColor: isInteractive ? '#3b82f6' : '#9ca3af', // blue-500 : gray-400
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    opacity: isInteractive ? 1 : 0.7,
    marginLeft: '10px'
  };

  return (
    <div style={{ 
      border: '1px solid #e5e7eb',
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#f9fafb', // gray-50
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span>Count: {count}</span>
      <button onClick={increment} disabled={!isInteractive} style={buttonStyle}>
        Increment
      </button>
    </div>
  );
}

export default SimpleCounter; 