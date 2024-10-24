import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  background: #fff;
  color: #000;
  font-weight: 600;
  padding: 10px 20px;
  margin-top: 50px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

const GithubButton = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo
        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        alt="Github Logo"
      />
      Continue with Github
    </Button>
  );
};

export default GithubButton;
