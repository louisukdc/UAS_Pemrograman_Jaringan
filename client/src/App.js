import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import ReservationList from './components/ReservationList';
import RoomList from './components/RoomList';
import UserList from './components/UserList'; 

function App() {
    return ( 
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/reservation" element={<ReservationList/>}/>
            <Route path="/roomlist" element={<RoomList/>}/>
            <Route path="/userlist" element={<UserList/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;