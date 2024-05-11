import React, { useEffect, useState } from "react";
import axios from "axios";
import Page404 from '../Page404';
import Cookies from "js-cookie";

const Index = () => {
  const [dogsLoading, setDogsLoading] = useState(true);
  const [dogs, setDogs] =  useState([]);
  const [message, setMessage] = useState({ error: false, message: '' });
  const loggedInUserEmail = Cookies.get('email');


  useEffect(() => {
    axios.get(process.env.REACT_APP_DOG_TOPIA_APP_API_URL + 'dogs', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': Cookies.get('token')
      }
    }).then((resp) => {
      setDogsLoading(false);
      if (resp.data.error !== undefined && resp.data.error !== '') {
        setMessage({ error: true, message: resp.data.error });
      } else {
        setDogs(resp.data.dogs);
      }
    });
  }, []);

  return(
    <>
      { !loggedInUserEmail ?
        <Page404/> :
        <>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-1 py-8 mx-auto">
              <div className="gap-4 w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-screen-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Dog Profiles</h1>
                  <hr />
                  {message && <div className={`${message['error'] ? 'text-red-600': 'text-green-500'}`}>{message['message']}</div>}
                  {
                    dogsLoading ? "loading..." :
                    <>
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th>Name</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Photo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            dogs.map((dog, index) => (
                              <tr>
                                <td>{dog['name']}</td>
                                <td>{dog['breed']}</td>
                                <td>{dog['age']}</td>
                                <td> <img src={dog['image_url']} width="100px" height="100px"/> </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </>
                  }
                </div>
              </div>
            </div>
          </section>
        </>
      }
    </>
  );
}

export default Index;
