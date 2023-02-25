import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledModal } from "../login/LoginModal";
import { selectEntryById, updateEntry } from "./entriesSlice";

function EditModal({ id, token, setShowEditModal, setBackdrop, setEntryId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const entry = useSelector((state) => selectEntryById(state, id));

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    }
  }, [entry]);

  function handleNewEntry() {
    if (!(title && content)) {
      return setError("You must enter title and content");
    }
    setError("");
    dispatch(updateEntry({ token, newData: { title, content }, id }));
    setShowEditModal(false);
    setBackdrop(false);
    setEntryId(null);
  }

  return (
    <StyledModal
      className="entry-modal"
      style={{ width: "80%", margin: "10vh 10% 0 10%", maxHeight: "80vh" }}
    >
      <h2>Edit entry</h2>
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
            setShowEditModal(false);
            setBackdrop(false);
          }}
        >
          Cancel
        </button>
        <button onClick={handleNewEntry}>Edit</button>
      </div>
    </StyledModal>
  );
}

export default EditModal;
