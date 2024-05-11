import React,  { useState, useEffect } from "react";
import axios from 'axios';
import Page404 from '../Page404';
import Cookies from "js-cookie";
import {  useNavigate } from "react-router-dom";

const New = () => {
  const [breedsLoading, setBreedsLoading] = useState(true);
  const [breedImageLoading, setBreedImageLoading] = useState(false);
  const [breedImage, setBreedImage] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [message, setMessage] = useState({ error: false, message: '' });
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    image_url: ''
  });
  const loggedInUserEmail = Cookies.get('email');

  useEffect(() => {
    axios.get(process.env.REACT_APP_DOG_TOPIA_APP_API_URL + 'dogs/dogs', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': Cookies.get('token')
      }
    }).then((resp) => {
      setBreedsLoading(false);
      if (resp.data.error !== undefined && resp.data.error !== '') {
        setMessage({ error: true, message: resp.data.error });
      } else {
        setBreeds(resp.data.dogs);
      }
    });
  }, []);
  
  const handleOnChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleOnBreedChange = (e: any) => {
    setBreedImage(false);
    setBreedImageLoading(true);

    if(e.target.value !== '') {
      formData['breed'] = e.target.value;

      axios.get(process.env.REACT_APP_DOG_TOPIA_APP_API_URL + 'dogs/dog_image?dog_breed=' + e.target.value, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': Cookies.get('token')
        }
      }).then((resp) => {
        setBreedImageLoading(false);
        if (resp.data.error !== undefined && resp.data.error !== '') {
          setMessage({ error: true, message: resp.data.error });
        } else {
          formData['image_url'] = resp.data.image;
          setBreedImage(true);
        }
      });
    }
  }

  const SubmitSignIn = (e: any) => {
    e.preventDefault();

    axios.post(process.env.REACT_APP_DOG_TOPIA_APP_API_URL + 'dogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': Cookies.get('token')
      }
    }).then((resp) => {
      if (resp.data.error !== undefined && resp.data.error !== '' ) {
        setMessage({ error: true, message: resp.data.error });
      } else {
        setFormData({
          name: '',
          age: '',
          breed: '',
          image_url: ''
        });
        setBreedImage(false);
        setMessage({error: false, message: resp.data.message});
      }
    });
  }

  return(
    <>
      { !loggedInUserEmail ?
        <Page404/> :
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="gap-4 w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-screen-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="grid grid-cols-2">
                  <div>
                    {message && <div className={`${message['error'] ? 'text-red-600': 'text-green-500'}`}>{message['message']}</div>}
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Dog Profile
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={SubmitSignIn}>
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" onChange={handleOnChange} value={formData.name} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                        <input type="number" name="age" onChange={handleOnChange} value={formData.age} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="breed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Breed</label>
                        <select name="breed" onChange={handleOnBreedChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option>{breedsLoading ? 'Loading..' : '-Select-'}</option>
                          {breeds.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                    </form>
                  </div>
                  <div className="px-5 items-center justify-center">
                    { breedImageLoading && 'loading...' }
                    { breedImage && <img src={formData['image_url']} alt='breed_image' className="gap-4 w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-screen-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" /> }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
}

export default New;
