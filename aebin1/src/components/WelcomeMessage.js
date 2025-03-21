// src/components/WelcomeMessage.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/WelcomeMessage.module.css';

const WelcomeMessage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.welcomeMessage} ${visible ? styles.visible : ''}`}>
      <h2>¡Bienvenido y gracias por usar AE-BIN, cuidemos juntos del ambiente!</h2>
    </div>
  );
};

export default WelcomeMessage;
