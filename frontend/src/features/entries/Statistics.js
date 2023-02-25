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
    return <div />;
  }

  return (
    <div className="subcontainer">
      <CurrentRoute route="Statistics" />
      <StatsItem>
        <p>Total entries:</p>
        <p>{userEntries.length}</p>
      </StatsItem>
      <StatsItem>
        <TotalEntriesPerYear entries={userEntries} />
      </StatsItem>
      <StatsItem>
        <AverageNumPerMonth entries={userEntries} />
      </StatsItem>
    </div>
  );
}

export default Statistics;
