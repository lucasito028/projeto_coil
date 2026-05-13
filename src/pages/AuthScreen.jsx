import { useState } from "react";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";

export default function AuthScreen() {
  const [screen, setScreen] =
    useState("login");

  return (
    <div style={styles.page}>
      {/* BG EFFECT */}
      <div style={styles.blur1}></div>
      <div style={styles.blur2}></div>

      <div style={styles.container}>
        {screen === "login" ? (
          <Login
            onChangeScreen={() =>
              setScreen("create")
            }
          />
        ) : (
          <CreateAccount
            onChangeScreen={() =>
              setScreen("login")
            }
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",

    minWidth: `100vw`,

    background:
      "linear-gradient(135deg, #0f172a, #111827, #1e293b)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    overflowX: "hidden",

    overflowY: "hidden",

    position: "relative",

    padding: 30,

    fontFamily: "Arial",

    color: "white"
  },

  blur1: {
    position: "absolute",

    width: 500,
    height: 500,

    background: "#2563eb",

    opacity: 0.15,

    filter: "blur(140px)",

    top: -100,
    left: -100
  },

  blur2: {
    position: "absolute",

    width: 500,
    height: 500,

    background: "#7c3aed",

    opacity: 0.15,

    filter: "blur(140px)",

    bottom: -100,
    right: -100
  },

  container: {
    width: "100%",

    maxWidth: 520,

    zIndex: 2
  }
};