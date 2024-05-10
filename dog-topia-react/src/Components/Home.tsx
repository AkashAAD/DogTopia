import React from "react";
import logo from '../../src/Setup/Assets/logo.svg';

const Home = () => {
  return(
  <div className="flex items-center justify-center h-svh">
    <div className="box-border h-800 w-800 p-4">
      <h1 className="text-5xl font-bold">Welcome to the Dog Topia</h1>
      <br/>
      <img className="mx-auto" src={logo} />
    </div>
  </div>
  );
}

export default Home;
