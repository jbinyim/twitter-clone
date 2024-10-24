import React from "react";
import { auth } from "../firebase";

const Home = () => {
  const logout = () => {
    auth.signOut();
  };

  return (
    <div>
      <button onClick={logout}>log out</button>
    </div>
  );
};

export default Home;
