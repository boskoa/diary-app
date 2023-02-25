import { useState } from "react";
import { useDispatch } from "react-redux";
import { StyledModal } from "../login/LoginModal";
import { addNewEntry } from "./entriesSlice";

function NewEntryModal({ setShowNewModal, setBackdrop, token }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function handleNewEntry() {
    if (!(title && content)) {
      return setError("You must enter title and content");
    }
    setError("");
    dispatch(addNewEntry({ token, entryData: { title, content } }));
    setShowNewModal(false);
    setBackdrop(false);
  }

  return (
    <StyledModal
      className="entry-modal"
      style={{ width: "80%", margin: "10vh 10% 0 10%", maxHeight: "80vh" }}
    >
      <h2>Add new entry</h2>
      <label htmlFor="entry-title">Title</label>
      <input
        id="entry-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        type="text"
        style={{ resize: "vertical" }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <div className="modal-buttons">
        <button
          onClick={() => {
            setShowNewModal(false);
            setBackdrop(false);
          }}
        >
          Cancel
        </button>
        <button onClick={handleNewEntry}>Create</button>
      </div>
    </StyledModal>
  );
}

export default NewEntryModal;
