import React, { useState } from "react";
import Page404 from "../Page404";
import Cookies from 'js-cookie';

import axios from 'axios';

const SignIn = () => {
  const loggedInUserEmail = Cookies.get('email');
  const [message, setMessage] = useState({ error: false, message: '' });
  const [formData, setFormData] = useState({ email: '', password: ''});

  const handleOnChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SubmitSignIn = (e: any) => {
    e.preventDefault();

    axios.post(process.env.REACT_APP_DOG_TOPIA_APP_API_URL + 'authentication/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((resp) => {
      if (resp.data.error !== undefined && resp.data.error !== '' ) {
        setMessage({ error: true, message: resp.data.error });
      } else {
        Cookies.set('token', resp.data.token, { secure: true });
        Cookies.set('email', resp.data.email, { secure: true });

        window.location.href = '/';
      }
    });
  }

  return(
    <div>
      { loggedInUserEmail ? <Page404/> :
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {message && <div className={`${message['error'] ? 'text-red-600': 'text-green-500'}`}>{message['message']}</div>}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign In
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={SubmitSignIn}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" onChange={handleOnChange} value={formData.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" onChange={handleOnChange} value={formData.password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign In</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  );
}

export default SignIn;
