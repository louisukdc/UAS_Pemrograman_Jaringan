import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8001/register', {
        username: name, // Changed from 'name' to 'username'
        email,
        password,
      });
  
      setSuccess(response.data.message || "Registration successful.");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <center>
          <h3 className="title is-5">Register</h3>
        </center>
        <form onSubmit={handleRegister}>
          {error && (
            <div className="notification is-danger">
              <button className="delete" onClick={() => setError('')}></button>
              {error}
            </div>
          )}
          {success && (
            <div className="notification is-success">
              <button className="delete" onClick={() => setSuccess('')}></button>
              {success}
            </div>
          )}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary">Register</button>
            </div>
          </div>
        </form>
        <p className="mt-3">
          Already have an account?{' '}
          <Link to="/login" className="has-text-info">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
