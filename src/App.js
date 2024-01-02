import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import bgImage from './bg.jpeg';

const App = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };
  return (
    <Router>
      <div style={backgroundStyle}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
