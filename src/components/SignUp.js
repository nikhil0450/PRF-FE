import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email format');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password, confirmPassword }),
      });

      if (response.ok) {
        console.log('Sign-up Successful');
        setSuccessMessage('Sign-up Successful');
      } else {
        const data = await response.json();
        console.error(`Sign-up failed: ${data.message}`);
        setErrorMessage(`Sign-up failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('Error during sign-up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container position-absolute top-50 start-50 translate-middle col-md-6 bg-light" style={{ width: "80%", maxWidth: "400px", border: "2px solid black", padding: "20px", borderRadius: "10px" }}>
      <h2 className='text-center'>Sign Up</h2>
      <form className="mx-auto mt-2" style={{ display: 'flex', flexDirection: 'column' }}>
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
          <label style={{ padding: '10px 0' }}>Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div className="form-group mb-3" style={{ textAlign: 'left' }}>
          <label style={{ padding: '10px 0' }}>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary mb-3" onClick={handleSignUp} disabled={isLoading} >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        <p className='text-center'>
          Already a user? <Link to="/signin">Sign in now</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
