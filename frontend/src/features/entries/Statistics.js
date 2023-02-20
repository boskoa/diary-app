import { useSelector } from "react-redux";
import { selectAllEntries } from "./entriesSlice";

function Statistics() {
  const userEntries = useSelector(selectAllEntries);

  return (
    <div id="statistics">
      {userEntries.map((e) => (
        <p key={e.id}>{JSON.stringify(e)}</p>
      ))}
      <div>
        <p>Total entries</p>
        <p>{userEntries.length}</p>
      </div>
    </div>
  );
}

export default Statistics;
