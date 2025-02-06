import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomAdd from './RoomAdd';
import { Link } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // Add this state

  useEffect(() => {
    // Mengambil data kamar dari API
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8001/room');
        setRooms(response.data.data); // Menyimpan data kamar ke state
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchRooms(); // Memanggil fungsi fetchRooms saat komponen pertama kali dimuat
  }, []); // Kosongkan array dependensi agar hanya berjalan sekali

  return (
    <div className="container mt-5">
      <h2 className="title is-3 has-text-centered">Room List</h2>

      {/* Add New User Button */}
      <div className="field has-text-centered">
        <button className="button is-primary" onClick={() => setIsFormVisible(true)}>
          Add New Room
        </button>
      </div>

      {/* Show Add User Form */}
      {isFormVisible && <RoomAdd setRooms={setRooms} setIsFormVisible={setIsFormVisible} />}

      {/* User List Table */}
      <div className="table-container">
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>room_name</th>
              <th>capacity</th>
              <th>location</th>
              <th>description</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rooms) && rooms.length > 0 ? (
              rooms.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.room_name}</td>
                  <td>{room.capacity}</td>
                  <td>{room.description}</td>
                  <td>{room.status}</td>
                  <td>
                    <Link className="button is-small is-info" to={`/edit/${room.id}`}>
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
                  No room found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList;
