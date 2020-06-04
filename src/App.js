import React, {useState, useEffect} from 'react';
import MyNavbar from './Components/Nav/Navbar';
import Auth from './Components/Auth/Auth';
import TaskIndex from './Components/Task/TaskIndex';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState('');

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken);
    setSignedIn(true);
  }

  const logOut = (e) => {
    e.preventDefault()
    setSignedIn(false);
    setToken('');
    localStorage.removeItem('token');
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      updateToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <MyNavbar signedIn={signedIn} logOut={logOut} />
      </BrowserRouter>
      { signedIn ? <TaskIndex token={token} /> : <Auth updateToken={updateToken}/>}
      {/* <TaskIndex /> */}
      
    </div>
  );
}

export default App;
