import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <div className ="bg-[#0f0f0f]">
        <App />
      </div>
      
    </UserProvider>
  </React.StrictMode>
);
