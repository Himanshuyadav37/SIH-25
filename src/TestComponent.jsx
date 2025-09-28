import React from 'react';

function TestComponent() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#333', marginBottom: '1rem' }}>
        🚀 Website is Working!
      </h1>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>
        If you can see this, React is loading properly.
      </p>
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: '#e3f2fd',
        borderRadius: '8px',
        border: '2px solid #2196f3'
      }}>
        <p style={{ color: '#1976d2', fontWeight: 'bold' }}>
          ✅ React is running successfully!
        </p>
      </div>
    </div>
  );
}

export default TestComponent;

