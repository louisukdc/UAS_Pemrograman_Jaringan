import React, { useState } from 'react';
import axios from 'axios';

const RoomAdd = ({ setRooms, setIsFormVisible }) => {
  const [newRoom, setNewRoom] = useState({
    room_name: '',
    capacity: '',
    location: '',
    description: '',
    status: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validasi input kapasitas
    if (isNaN(newRoom.capacity) || newRoom.capacity <= 0) {
      setError('Capacity must be a valid number greater than 0');
      return;
    }

    // Menyiapkan data untuk dikirim
    const roomData = {
      room_name: newRoom.room_name,
      capacity: parseInt(newRoom.capacity, 10), // Mengonversi kapasitas menjadi integer
      location: newRoom.location,
      description: newRoom.description,
      status: newRoom.status,
    };

    setIsLoading(true); // Menandakan sedang memuat

    try {
      const response = await axios.post('http://localhost:8001/room', roomData);

      if (response.status === 201) {
        // Menambahkan kamar ke dalam state rooms
        setRooms((prevRooms) => {
          return Array.isArray(prevRooms)
            ? [...prevRooms, response.data.data]
            : [response.data.data];
        });
        
        setIsFormVisible(false); // Menyembunyikan form setelah berhasil menambahkan
      } else {
        setError('Failed to create room');
      }
    } catch (err) {
      setError('Failed to create room');
    } finally {
      setIsLoading(false); // Menghentikan status loading
    }
  };

  return (
    <div className="room-add-form">
      <h3>Add New Room</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label">Room Name</label>
          <input
            type="text"
            className="input"
            value={newRoom.room_name}
            onChange={(e) => setNewRoom({ ...newRoom, room_name: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label className="label">Capacity</label>
          <input
            type="number"
            className="input"
            value={newRoom.capacity}
            onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label className="label">Location</label>
          <input
            type="text"
            className="input"
            value={newRoom.location}
            onChange={(e) => setNewRoom({ ...newRoom, location: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label className="label">Description</label>
          <input
            type="text"
            className="input"
            value={newRoom.description}
            onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label className="label">Status</label>
          <input
            type="text"
            className="input"
            value={newRoom.status}
            onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="button is-success" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Room'}
        </button>
        <button type="button" className="button is-light" onClick={() => setIsFormVisible(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default RoomAdd;
