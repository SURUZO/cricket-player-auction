// Title.js

import React from 'react';
import Card from 'react-bootstrap/Card';

const Title = ({ text }) => (
  <div className="container mt-4">
    <Card style={{ background: 'linear-gradient(45deg, #3498db, #e74c3c)', border: 'none' }}>
      <Card.Body>
        <h2 className="text-center mb-4" style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px #2c3e50' }}>
          <span role="img" aria-label="cricket">🏏</span> {text}
        </h2>
      </Card.Body>
    </Card>
  </div>
);

export default Title;
