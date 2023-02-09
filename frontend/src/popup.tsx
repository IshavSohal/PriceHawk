import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TrackingPageButton from './components/TrackingPageButton'
import SignInButton from './components/SignInButton'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
  <React.StrictMode>
    <App />
    <SignInButton></SignInButton>
    {/* <TrackingPageButton> </TrackingPageButton> */}
  </React.StrictMode>
  
  </div>
);
