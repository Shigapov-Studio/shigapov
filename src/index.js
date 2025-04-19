import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Удаляем preloader после монтирования React-приложения
const preloader = document.getElementById('preloader');
if (preloader) {
  preloader.style.opacity = '0';
  preloader.style.transition = 'opacity .3s ease';
  setTimeout(() => {
    preloader.remove();
  }, 300);
}
