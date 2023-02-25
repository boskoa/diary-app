import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import LoginModal from "./features/login/LoginModal";
import { alreadyLogged } from "./features/login/loginSlice";
import GlobalStyle from "./GlobalStyle";
import { light, dark } from "./themes";
import Spinner from "./components/Spinner";
import MainPage from "./features/entries/MainPage";
import NewUserModal from "./features/users/NewUserModal";

const UserSettings = lazy(() => import("./features/users/UserSettings"));
const Statistics = lazy(() => import("./features/entries/Statistics"));

function App() {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedDiaryUser");
    if (loggedUser) {
      dispatch(alreadyLogged(JSON.parse(loggedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    const prevTheme = window.localStorage.getItem("diaryTheme");
    setTheme(prevTheme);
  }, []);

  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem(
      "diaryTheme",
      theme === "light" ? "dark" : "light"
    );
  }

  return (
    <div>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout handleTheme={handleTheme} />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginModal />} />
            <Route path="signup" element={<NewUserModal />} />
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
