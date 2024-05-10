import React from 'react';
import './App.css';
import Navbar from './Setup/Navbar/Navbar';
import Home from './Components/Home';
import SignIn from './Components/User/SignIn';
import SignUp from './Components/User/SignUp';
import NewDog from './Components/Dog/New';
import Dogs from './Components/Dog/Index';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/new-dog' element={<NewDog/>} />
          <Route path='/dogs' element={<Dogs/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
