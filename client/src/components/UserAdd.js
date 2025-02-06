import React, { useState } from 'react';
import axios from 'axios';

const UserAdd = ({ setUsers, setIsFormVisible }) => {
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8001/user', newUser);
      if (response.status === 201) {
        setUsers((prevRooms) => [...prevRooms, response.data.data]); // Menambahkan data baru ke state
        setIsFormVisible(false); // Menyembunyikan form setelah berhasil menambah kamar
      }
    } catch (err) {
      setError('Failed to create room');
    }
  };

  return (
    <div className="user-add-form">
      <h3>Add New User</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <input
            type="text"
            className="input"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="button is-success">
          Add User
        </button>
        <button type="button" className="button is-light" onClick={() => setIsFormVisible(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserAdd;
