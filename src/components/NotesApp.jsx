import React, { useState, useEffect, useMemo } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import ArchivePage from "../pages/ArchivePage";
import DetailPageWrapper from "../pages/DetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/network-data";
import LocaleContext from "../Context/LocaleContext";
import ThemeContext from "../Context/ThemeContext";
import LocaleButton from "./LocaleButton";
import ThemeButton from "./ThemeButton";

const NotesApp = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
    fetchUser();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      return prevLocale === "id" ? "en" : "id";
    });
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="app-container" data-theme={theme}>
            <header>
              <h1>{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</h1>
              <LocaleButton />
              <ThemeButton />
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container" data-theme={theme}>
          <header>
            <h1>
              <Link to="/">{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</Link>
            </h1>
            <Navigation logout={onLogout} name={authedUser.name} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/AddPage" element={<AddPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/notes/:id" element={<DetailPageWrapper />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
};

export default NotesApp;
