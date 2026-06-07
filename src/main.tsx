import React from 'react';
import { createRoot } from 'react-dom/client';
import '../components/tokens.css';
import './styles.css';
import { CheckoutApp } from './checkout/CheckoutApp';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CheckoutApp />
  </React.StrictMode>,
);
