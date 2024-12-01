import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// root - элемент в public/index.html, куда встраивается React библиотека
// <div id="root"></div>
// В index.html встраивается компонента App, остальные компоненты встраиваются в App
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);

