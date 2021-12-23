import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const Button = styled.button`
  border: 2px solid var(--color-almond);
  background: var(--color-red);
  color: var(--color-almond);
  border-radius: 30px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: var(--color-almond);
    color: var(--color-red);
  }
`;

export default LoginButton;
