import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://password-reset-flow-qp65.onrender.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Signin successful');
        setSuccessMessage('Sign-in successful');
        // Redirect or perform actions after successful signin
      } else {
        const data = await response.json();
        console.error(`Signin failed: ${data.message}`);
        setErrorMessage(`Sign-in failed: ${data.message}`);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error during signin:', error);
      setErrorMessage('Error during signin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container position-absolute top-50 start-50 translate-middle col-md-6 bg-light" style={{ width: "80%", maxWidth: "400px", border: "2px solid black", borderRadius: "10px", padding: "20px" }}>
      <h2 className='text-center'>Sign In</h2>
      <form className="mx-auto" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="form-group mb-3" style={{ textAlign: 'left' }}>
          <label style={{ padding: '10px 0' }}>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3" style={{ textAlign: 'left' }}>
          <label style={{ padding: '10px 0' }}>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mb-3 text-center">
          <Link to="/forgotpassword" className="text-secondary">Forgot Password?</Link>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-primary mb-3 w-75" onClick={handleSignIn} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
        {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      </form>
      <p className='text-center'>
        New user? <Link to="/signup">Sign up now</Link>
      </p>
    </div>
  );
};

export default SignIn;
