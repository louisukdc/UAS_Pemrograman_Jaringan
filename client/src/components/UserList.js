import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserAdd from './UserAdd';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8001/user');
        console.log(response.data); // Mengecek struktur data yang diterima
        setUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="title is-3 has-text-centered">User List</h2>

      {/* Add New User Button */}
      <div className="field has-text-centered">
        <button className="button is-primary" onClick={() => setIsFormVisible(true)}>
          Add New User
        </button>
      </div>

      {/* Show Add User Form */}
      {isFormVisible && <UserAdd setUsers={setUsers} setIsFormVisible={setIsFormVisible} />}

      {/* User List Table */}
      <div className="table-container">
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link className="button is-small is-info" to={`/edit/${user.id}`}>
                      Edit
                    </Link>
                    <button
                      onClick={() => {} /* Function to delete user */}
                      className="button is-small is-danger ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="has-text-centered">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
