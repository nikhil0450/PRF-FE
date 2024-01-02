import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://password-reset-flow-qp65.onrender.com/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Password reset link sent successfully');
        setSuccessMessage('Password reset link sent successfully');
      } else {
        const data = await response.json();
        console.error(`Password reset failed: ${data.message}`);
        setErrorMessage(`Password reset failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setErrorMessage('Error during password reset:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container position-absolute top-50 start-50 translate-middle col-md-6 bg-light" style={{ width: "80%", maxWidth: "400px", border: "2px solid black", borderRadius: "10px", padding: "20px" }}>
      <h2 className='text-center'>Forgot Password</h2>
      <form className="mx-auto" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="form-group mb-3" style={{ textAlign: 'left' }}>
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button type="button" className="btn btn-primary mb-3" style={{margin:"auto", textAlign:"center"}} onClick={handleForgotPassword} disabled={isLoading}>
          {isLoading ? 'Sending mail...' : 'Submit'}
        </button>
        </div>
        {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        <p className='text-center'>
          Remember password? <Link to="/signin">Sign in now</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
