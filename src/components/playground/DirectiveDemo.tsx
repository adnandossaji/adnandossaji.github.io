import { useState, useEffect } from 'react';

interface DirectiveDemoProps {
  directiveName: string;
  hydrationTime?: string;
}

export default function DirectiveDemo({ directiveName, hydrationTime }: DirectiveDemoProps) {
  const [count, setCount] = useState(0);
  const [mountTime, setMountTime] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    // Record when the component was hydrated
    const now = new Date();
    setMountTime(now.toLocaleTimeString());

    // Calculate time since page load
    const pageLoadTime = performance.timing?.navigationStart || performance.timeOrigin;
    const timeSincePageLoad = Math.floor((now.getTime() - pageLoadTime) / 1000);
    setElapsedTime(timeSincePageLoad);

    // Set the hydration time using a callback if provided
    if (typeof hydrationTime === 'string') {
      const hydrateCallback = (window as any)[hydrationTime];
      if (typeof hydrateCallback === 'function') {
        hydrateCallback(directiveName, now);
      }
    }
  }, []);

  const styles = {
    directiveDemo: {
      backgroundColor: 'var(--theme-bg)',
      border: '2px solid var(--theme-accent)',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
    },
    demoHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
    directiveLabel: {
      backgroundColor: 'var(--theme-accent)',
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontWeight: 'bold',
    },
    hydrationTime: {
      fontSize: '0.9rem',
      color: 'var(--theme-text-light)',
    },
    elapsed: {
      fontStyle: 'italic',
      marginLeft: '0.5rem',
    },
    demoContent: {
      backgroundColor: 'var(--theme-bg-offset)',
      padding: '1rem',
      borderRadius: '4px',
    },
    counter: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '0.5rem',
    },
    button: {
      backgroundColor: 'var(--theme-accent)',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      width: '2rem',
      height: '2rem',
      fontSize: '1.2rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    counterValue: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      minWidth: '2rem',
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.directiveDemo}>
      <div style={styles.demoHeader}>
        <span style={styles.directiveLabel}>{directiveName}</span>
        <span style={styles.hydrationTime}>
          Hydrated at: {mountTime} 
          <span style={styles.elapsed}>({elapsedTime}s after page load)</span>
        </span>
      </div>
      
      <div style={styles.demoContent}>
        <p>This component is interactive! Try the counter:</p>
        <div style={styles.counter}>
          <button style={styles.button} onClick={() => setCount(c => c - 1)}>-</button>
          <span style={styles.counterValue}>{count}</span>
          <button style={styles.button} onClick={() => setCount(c => c + 1)}>+</button>
        </div>
      </div>
    </div>
  );
} 