import axios from "axios";
import { useState } from "react";
import { StyledButton } from "./UserSettings";

function Avatar({ loggedUser }) {
  const [name, setName] = useState("Choose avatar");
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    console.log("LOGGED USER", loggedUser);
    await axios.post(
      `http://localhost:3003/api/avatars/${loggedUser.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${loggedUser.token}`,
        },
      }
    );
  };

  return (
    <div id="avatar-box">
      <p>Set avatar</p>
      <form
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="avatar-form"
        encType="multipart/form-data"
      >
        <label htmlFor="avatar" style={{ maxWidth: "70%" }}>
          <input
            style={{
              font: "inherit",
              fontSize: "0.8em",
              maxWidth: "100%",
            }}
            id="avatar"
            type="file"
            name="avatar"
            onChange={(e) => {
              setName(loggedUser.id);
              setFile(e.target.files[0]);
              console.log("FILE", e.target.files[0]);
            }}
          />
        </label>
        <StyledButton
          style={{ margin: 0, width: "60px" }}
          onClick={(e) => handleSubmit(e)}
        >
          Set
        </StyledButton>
      </form>
      {file && (
        <img
          style={{
            height: "200px",
            width: "200px",
            display: "block",
            margin: "20px auto",
          }}
          alt="chosen avatar"
          src={file && URL.createObjectURL(file)}
        />
      )}
    </div>
  );
}

export default Avatar;
