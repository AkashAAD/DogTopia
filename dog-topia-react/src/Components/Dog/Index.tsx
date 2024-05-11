import React from "react";
import Page404 from '../Page404';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const loggedInUserEmail = Cookies.get('email');

  return(
    <>
      { !loggedInUserEmail ?
        <Page404/> :
        <h1>Index</h1>
      }
    </>
  );
}

export default Index;
