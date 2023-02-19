import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
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
import GlobalStyle from "./GlobalStyle";
import { light, dark } from "./themes";

function App() {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedDiaryUser");
    if (loggedUser) {
      dispatch(alreadyLogged(JSON.parse(loggedUser)));
    }
  }, [dispatch]);

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

  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    //dodati i u localeStorage
  }

  console.log("DATA", ids, user, error, entry, login);

  return (
    <div>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout handleTheme={handleTheme} />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
