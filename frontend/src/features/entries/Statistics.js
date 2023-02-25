import { useSelector } from "react-redux";
import styled from "styled-components";
import CurrentRoute from "../../components/CurrentRoute";
import AverageNumPerMonth from "./AverageNumPerMonth";
import { selectAllEntries } from "./entriesSlice";
import TotalEntriesPerYear from "./TotalEntriesPerYear";

const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  margin: 5px;
  border-radius: 3px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
`;

function Statistics() {
  const userEntries = useSelector(selectAllEntries);

  if (userEntries?.length === 0) {
    return (
      <StatsItem style={{ margin: "1em", padding: "10px", fontSize: "2em" }}>
        No entries
      </StatsItem>
    );
  }

  return (
    <div className="subcontainer">
      <CurrentRoute route="Statistics" />
      <StatsItem style={{ fontSize: "0.9em" }}>
        <p>Total entries:</p>
        <p>{userEntries.length}</p>
      </StatsItem>
      <StatsItem style={{ fontSize: "0.9em" }}>
        <TotalEntriesPerYear entries={userEntries} />
      </StatsItem>
      <StatsItem>
        <AverageNumPerMonth entries={userEntries} />
      </StatsItem>
    </div>
  );
}

export default Statistics;
