import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8001/reservation');
        if (Array.isArray(response.data)) {
          setReservations(response.data); // Set the array data
        } else {
          console.error("Data is not an array", response.data);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    
    fetchReservations();
  }, []);

  return (
    <div>
      <h2>Reservation List</h2>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            <Link to={`/reservations/${reservation.id}`}>{reservation.room_id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
