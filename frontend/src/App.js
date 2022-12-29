import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEntries,
  selectEntryById,
} from "./features/entries/entriesSlice";
import {
  alreadyLogged,
  logout,
  selectLoggedUser,
  selectLoginLoading,
  selectToken,
} from "./features/login/loginSlice";
import {
  selectAllUser,
  selectUserById,
  selectUserIds,
  selectUsersError,
  selectUsersLoading,
} from "./features/users/usersSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedDiaryUser");
    if (loggedUser) {
      dispatch(alreadyLogged(JSON.parse(loggedUser)));
    }
  }, []);

  // temporary
  const users = useSelector(selectAllUser);
  const ids = useSelector(selectUserIds);
  const user = useSelector((state) => selectUserById(state, 1));
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const entry = useSelector((state) => selectEntryById(state, 1));
  const loginLoading = useSelector(selectLoginLoading);
  const login = useSelector(selectLoggedUser);
  const token = useSelector(selectToken);

  // za brisati
  useEffect(() => {
    if (!loginLoading) {
      dispatch(getAllEntries(token));
    }
  }, [loginLoading]);

  if (loading || loginLoading) {
    return <div>Loading...</div>;
  }

  console.log("DATA", ids, user, error, entry, login);

  return (
    <div>
      <h3>Hai, what an ugly font... or not</h3>
      <p>
        {users.map((u, i) => (
          <span key={i}>{u.name}</span>
        ))}
      </p>
    </div>
  );
}

export default App;
