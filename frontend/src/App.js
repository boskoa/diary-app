import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import LoginModal from "./features/login/LoginModal";
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
import Spinner from "./components/Spinner";
import MainPage from "./features/entries/MainPage";

const UserSettings = lazy(() => import("./features/users/UserSettings"));
const Statistics = lazy(() => import("./features/entries/Statistics"));

function App() {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  //const loading = useSelector(selectUsersLoading);
  //const loginLoading = useSelector(selectLoginLoading);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedDiaryUser");
    if (loggedUser) {
      dispatch(alreadyLogged(JSON.parse(loggedUser)));
    }
  }, [dispatch]);

  // temporary
  /*
  const users = useSelector(selectAllUser);
  const ids = useSelector(selectUserIds);
  const user = useSelector((state) => selectUserById(state, 1));
  
  const error = useSelector(selectUsersError);
  const entry = useSelector((state) => selectEntryById(state, 1));
  
  const login = useSelector(selectLoggedUser);
  const token = useSelector(selectToken);

  // za brisati
  useEffect(() => {
    if (!loginLoading) {
      dispatch(getAllEntries(token));
    }
  }, [loginLoading]);
*/
  useEffect(() => {
    const prevTheme = window.localStorage.getItem("diaryTheme");
    setTheme(prevTheme);
  }, []);
  /*
  if (loading || loginLoading) {
    return <div>Loading...</div>;
  }
*/
  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem(
      "diaryTheme",
      theme === "light" ? "dark" : "light"
    );
  }

  //console.log("DATA", ids, user, error, entry, login);

  return (
    <div>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout handleTheme={handleTheme} />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginModal />} />
            <Route
              path="settings"
              element={
                <Suspense fallback={<Spinner />}>
                  <UserSettings />
                </Suspense>
              }
            />
            <Route
              path="statistics"
              element={
                <Suspense fallback={<Spinner />}>
                  <Statistics />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
