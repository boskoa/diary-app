import { StyledModal } from "../login/LoginModal";

function DeleteModal({ setShowDeleteModal, handleDeleteEntry, setBackdrop }) {
  return (
    <StyledModal className="entry-modal">
      <h2>Are you sure you want to delete this entry</h2>
      <div className="modal-buttons">
        <button onClick={handleDeleteEntry}>Yes</button>
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setBackdrop(false);
          }}
        >
          No
        </button>
      </div>
    </StyledModal>
  );
}

export default DeleteModal;
