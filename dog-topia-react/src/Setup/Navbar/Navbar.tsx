import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.svg';

function Navbar() {
  const [menu, setMenu] = useState('home');

  return (
    <nav className="bg-gray-400 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="React Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dog Topia</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link to={'/'} onClick={()=>{setMenu('home')}} className={`block md:hover:text-blue-700 ${menu === 'home' ? 'md:text-blue-700': ''}`} aria-current="page">Home</Link>
            </li>
            <li>
              <Link to={'/sign-up'} onClick={()=>{setMenu('sign_up')}} className={`block md:hover:text-blue-700  ${menu === 'sign_up' ? 'md:text-blue-700': ''}`}>Sign Up</Link>
            </li>
            <li>
              <Link to={'/sign-in'} onClick={()=>{setMenu('sign_in')}}  className={`block md:hover:text-blue-700 ${menu === 'sign_in' ? 'md:text-blue-700': ''}`}>Sign In</Link>
            </li>
            <li>
              <Link to={'/new-dog'} onClick={()=>{setMenu('new_dog')}} className={`block md:hover:text-blue-700 ${menu === 'new_dog' ? 'md:text-blue-700': ''}`}>New Dog</Link>
            </li>
            <li>
              <Link to={'/dogs'} onClick={()=>{setMenu('dogs')}} className={`block md:hover:text-blue-700 ${menu === 'dogs' ? 'md:text-blue-700': ''}`}>Dogs</Link>
            </li>
            <li>
              <Link to="#" onClick={()=>{setMenu('dogs')}} className='block md:hover:text-blue-700'>Log Out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
