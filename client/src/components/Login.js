import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    try {
      const response = await axios.post('http://localhost:8001/login', { email, password });
      // Simpan token atau data pengguna jika diperlukan
      localStorage.setItem('token', response.data.token);
      // Arahkan ke halaman beranda setelah login berhasil
      navigate('/roomlist');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <center>
          <h3 className="title is-5">Login</h3>
        </center>
        <form onSubmit={handleLogin}>
          {error && (
            <div className="notification is-danger">
              <button className="delete" onClick={() => setError('')}></button>
              {error}
            </div>
          )}
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
            <div className="control">
              <button className="button is-success">Login</button>
            </div>
          </div>
        </form>
        <p className="mt-3">
          Don't have an account?{' '}
          <Link to="/register" className="has-text-info">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
