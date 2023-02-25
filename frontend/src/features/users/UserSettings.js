import styled from "styled-components";
import CurrentRoute from "../../components/CurrentRoute";
import useSettings from "../../customHooks/useSettings";
import Avatar from "./Avatar";

const StyledSettings = styled.div`
  color: ${({ theme }) => theme.text};
`;

const StyledInput = styled.input`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  background-color: rgba(250, 250, 250, 0.3);
  border: 0.5px solid rgba(250, 250, 250, 0.1);
  border-radius: 3px;
`;

function UserSettings() {
  const {
    name,
    setName,
    username,
    setUsername,
    newPassword,
    setNewPassword,
    currentPassword,
    setCurrentPassword,
    updateErrorMessage,
    nameError,
    usernameError,
    passwordError,
    submit,
    loggedUser,
  } = useSettings();

  return (
    <div>
      <CurrentRoute route="Settings" />
      <StyledSettings id="settings-main">
        <StyledSettings id="settings">
          <label htmlFor="name">User's name</label>
          <StyledInput
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <StyledInput
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="new-password">New password</label>
          <StyledInput
            name="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="current-password">Current password</label>
          <StyledInput
            style={{ color: "inherit" }}
            name="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button className="settings-button" onClick={submit}>
            Change
          </button>
          <StyledSettings>
            {updateErrorMessage && (
              <p className="error">{updateErrorMessage}</p>
            )}
            {nameError && <p className="error">{nameError}</p>}
            {usernameError && <p className="error">{usernameError}</p>}
            {passwordError && <p className="error">{passwordError}</p>}
          </StyledSettings>
        </StyledSettings>
        <Avatar loggedUser={loggedUser} />
      </StyledSettings>
    </div>
  );
}

export default UserSettings;
