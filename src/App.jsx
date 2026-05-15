import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";

import AuthScreen from "./pages/AuthScreen";

import {
  getSession
} from "./backend/auth";

function App() {

  const [session, setSession] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const currentSession =
      getSession();

    setSession(currentSession);

    setLoading(false);

  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "white",
          fontSize: 20
        }}
      >
        Carregando...
      </div>
    );
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            session
              ? <Home />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            session
              ? <Navigate to="/" />
              : <AuthScreen />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;