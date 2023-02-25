import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteEntry, selectEntriesLoading } from "./entriesSlice";
import CurrentRoute from "../../components/CurrentRoute";
import { selectAllEntries } from "./entriesSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useMemo, useState } from "react";
import DeleteModal from "./DeleteModal";
import { selectLoggedUser } from "../login/loginSlice";
import NewEntryModal from "./NewEntryModal";
import EditModal from "./EditModal";
import { months } from "./AverageNumPerMonth";
import Spinner from "../../components/Spinner";

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
  background-color: ${({ theme }) => theme.base} !important;
  color: ${({ theme }) => theme.text};
  position: fixed;
  padding: 22px;
  bottom: 1em;
  right: 1em;
  z-index: 1000;
  box-shadow: 1px 1px 7px 3px rgba(0, 0, 0, 0.5);
`;

const Filter = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  margin: 5px;
  padding: 5px;
  gap: 6px;
  border-radius: 3px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
  position: relative;
`;

function MainPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [entryId, setEntryId] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState("none");
  const [timeFilter, setTimeFilter] = useState([]);
  const dispatch = useDispatch();
  const userEntries = useSelector(selectAllEntries);
  const loading = useSelector(selectEntriesLoading);
  const user = useSelector(selectLoggedUser);
  /*
  const filteredEntries = !timeFilter.length
    ? userEntries
    : userEntries.filter((e) => {
        if (timeFilter[1] === "none") {
          return new Date(e.createdAt).getFullYear() === timeFilter[0];
        } else {
          return (
            new Date(e.createdAt).getFullYear() === timeFilter[0] &&
            new Date(e.createdAt).getMonth() === timeFilter[1]
          );
        }
      });
  */
  const filteredEntries = useMemo(() => {
    if (!timeFilter.length) {
      return userEntries;
    } else {
      return userEntries.filter((e) => {
        if (timeFilter[1] === "none") {
          return new Date(e.createdAt).getFullYear() === timeFilter[0];
        } else {
          return (
            new Date(e.createdAt).getFullYear() === timeFilter[0] &&
            new Date(e.createdAt).getMonth() === timeFilter[1]
          );
        }
      });
    }
  }, [timeFilter, userEntries]);

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

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ height: "100%" }} className="subcontainer">
      <CurrentRoute route="Main page" />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Filter id="filter">
          <input
            value={year || ""}
            type="number"
            size={4}
            min={2000}
            max={2100}
            placeholder="Enter year"
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <select
            style={{ width: "90px" }}
            value={month}
            onChange={(e) =>
              setMonth(!isNaN(e.target.value) ? Number(e.target.value) : "none")
            }
          >
            <option style={{ fontSize: "12px" }} value="none">
              Select month
            </option>
            {months.map((m, i) => (
              <option style={{ fontSize: "12px" }} key={i} value={i}>
                {m}
              </option>
            ))}
          </select>
          <button
            className="filter-button"
            onClick={() => {
              let tempYear = year;
              if (!year) {
                tempYear = new Date().getFullYear();
                setYear(tempYear);
              }
              setTimeFilter([tempYear, month]);
            }}
          >
            Filter
          </button>
          <button
            className="filter-button"
            onClick={() => {
              setTimeFilter([]);
              setYear(null);
              setMonth("none");
            }}
          >
            Reset
          </button>
        </Filter>
      </div>
      {filteredEntries.map((e) => (
        <Entry key={e.id}>
          <Datum>{new Date(e.createdAt).toLocaleDateString("en-GB")}</Datum>
          <h1 style={{ padding: "5px" }}>{e.title}</h1>
          <p
            style={{
              fontSize: "1.5em",
              marginBottom: "2em",
              whiteSpace: "pre-line",
              padding: "5px",
            }}
          >
            {e.content}
          </p>
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
