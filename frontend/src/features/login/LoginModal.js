import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLogin from "../../customHooks/useLogin";
import { selectLoginError } from "./loginSlice";

const StyledModal = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
`;

function LoginModal() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    loginError,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    submit,
  } = useLogin();
  const navigate = useNavigate();

  return (
    <StyledModal className="modal">
      <label htmlFor="username">Enter username</label>
      <input
        style={{ color: "inherit" }}
        type="text"
        name="username"
        maxLength={20}
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Enter password</label>
      <input
        style={{ color: "inherit" }}
        type="password"
        name="password"
        maxLength={30}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="modal-buttons">
        <button
          onClick={() => {
            navigate("/");
            setUsernameError("");
            setPasswordError("");
          }}
        >
          Cancel
        </button>
        <button disabled={!username || !password} onClick={submit}>
          Login
        </button>
      </div>
      {loginError && <p className="error">{loginError}</p>}
      {usernameError && <p className="error">{usernameError}</p>}
      {passwordError && <p className="error">{passwordError}</p>}
    </StyledModal>
  );
}

export default LoginModal;
