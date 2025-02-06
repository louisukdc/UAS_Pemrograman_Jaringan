import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import UserList from './components/UserList';

function App_Login() {
    return ( 
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserList/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App_Login;