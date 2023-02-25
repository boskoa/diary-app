import { useNavigate } from "react-router-dom";
import useSignup from "../../customHooks/useSignup";
import { StyledModal } from "../login/LoginModal";

function NewUserModal() {
  const {
    username,
    setUsername,
    name,
    setName,
    password,
    setPassword,
    signupError,
    usernameError,
    setUsernameError,
    nameError,
    setNameError,
    passwordError,
    setPasswordError,
    submit,
  } = useSignup();
  const navigate = useNavigate();

  return (
    <StyledModal className="modal">
      <label htmlFor="name">Enter name</label>
      <input
        style={{ color: "inherit" }}
        type="text"
        name="name"
        maxLength={20}
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
            setNameError("");
          }}
        >
          Cancel
        </button>
        <button disabled={!username || !password} onClick={submit}>
          Login
        </button>
      </div>
      {signupError && <p className="error">{signupError}</p>}
      {usernameError && <p className="error">{usernameError}</p>}
      {nameError && <p className="error">{nameError}</p>}
      {passwordError && <p className="error">{passwordError}</p>}
    </StyledModal>
  );
}

export default NewUserModal;
