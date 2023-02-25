import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addNewEntry, deleteEntry } from "./entriesSlice";
import CurrentRoute from "../../components/CurrentRoute";
import { selectAllEntries } from "./entriesSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { selectLoggedUser } from "../login/loginSlice";
import NewEntryModal from "./NewEntryModal";
import EditModal from "./EditModal";

const Entry = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  margin: 5px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 3px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Datum = styled.p`
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 1.5em;
`;

const AddContainer = styled.div`
  background-color: ${({ theme }) => theme.base};
  color: ${({ theme }) => theme.text};
  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 10;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.5);
`;

function MainPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [entryId, setEntryId] = useState(null);
  const dispatch = useDispatch();
  const userEntries = useSelector(selectAllEntries);
  const user = useSelector(selectLoggedUser);

  function handleDeleteEntry() {
    dispatch(deleteEntry({ token: user.token, id: entryId }));
    setEntryId(null);
    setShowDeleteModal(false);
    setBackdrop(false);
  }

  if (!user) {
    return (
      <Entry style={{ fontSize: "2em", marginTop: "10%", textAlign: "center" }}>
        Please, log in.
      </Entry>
    );
  }

  return (
    <div style={{ height: "100%" }} className="subcontainer">
      <CurrentRoute route="Main page" />
      {userEntries.map((e) => (
        <Entry key={e.id}>
          <Datum>{new Date(e.createdAt).toLocaleDateString("en-GB")}</Datum>
          <h1>{e.title}</h1>
          <p style={{ fontSize: "1.5em", marginBottom: "2em" }}>{e.content}</p>
          <div
            className="buttons"
            id="delete-button"
            onClick={() => {
              setShowDeleteModal(true);
              setBackdrop(true);
              setEntryId(e.id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </div>
          <div
            className="buttons"
            id="edit-button"
            onClick={() => {
              setShowEditModal(true);
              setBackdrop(true);
              setEntryId(e.id);
            }}
          >
            <EditIcon fontSize="small" />
          </div>
        </Entry>
      ))}
      <AddContainer
        className="buttons"
        onClick={() => {
          setShowNewModal(true);
          setBackdrop(true);
        }}
      >
        <AddIcon fontSize="large" />
      </AddContainer>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          handleDeleteEntry={handleDeleteEntry}
          setBackdrop={setBackdrop}
        />
      )}
      {showNewModal && (
        <NewEntryModal
          setShowNewModal={setShowNewModal}
          setBackdrop={setBackdrop}
          token={user.token}
        />
      )}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setBackdrop={setBackdrop}
          token={user.token}
          id={entryId}
          setEntryId={setEntryId}
        />
      )}
      {backdrop && <div id="backdrop" />}
    </div>
  );
}

export default MainPage;
