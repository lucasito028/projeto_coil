import { useState } from "react";

import { login } from "../backend/auth";

export default function Login({
  onChangeScreen
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    try {

      setLoading(true);

      setError("");

      const response =
        await login(email, password);

      if (!response.success) {

        setError(response.message);

        return;
      }

      console.log(
        "Usuário logado:",
        response.session
      );

      alert("Login realizado!");

    } catch (err) {

      setError("Erro inesperado");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>
        Bem-vindo de volta
      </h1>

      <p style={styles.subtitle}>
        Faça login para continuar
      </p>

      <div style={styles.inputWrapper}>
        <input
          placeholder="Seu email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
        />
      </div>

      <div style={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />
      </div>

      {error && (
        <p style={styles.error}>
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        style={styles.mainButton}
        disabled={loading}
      >
        {
          loading
            ? "Entrando..."
            : "Entrar"
        }
      </button>

      <button
        onClick={onChangeScreen}
        style={styles.linkButton}
      >
        Criar conta
      </button>
    </div>
  );
}

const styles = {
  card: {
    minWidth: "100%",

    background:
      "rgba(255,255,255,0.06)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    backdropFilter: "blur(20px)",

    borderRadius: 32,

    padding: 40,

    boxShadow:
      "0 20px 80px rgba(0,0,0,.35)"
  },

  title: {
    fontSize: 42,

    fontWeight: 800,

    marginBottom: 12
  },

  subtitle: {
    color: "#cbd5e1",

    marginBottom: 30,

    fontSize: 16
  },

  inputWrapper: {
    width: "100%",

    height: 68,

    display: "flex",

    alignItems: "center",

    padding: "0 20px",

    marginBottom: 18,

    borderRadius: 18,

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxSizing: "border-box"
  },

  input: {
    flex: 1,

    background: "transparent",

    border: "none",

    outline: "none",

    color: "white",

    fontSize: 16
  },

  mainButton: {
    width: "100%",

    height: 68,

    border: "none",

    borderRadius: 18,

    background:
      "linear-gradient(90deg,#2563eb,#7c3aed)",

    color: "white",

    fontSize: 17,

    fontWeight: 700,

    cursor: "pointer",

    marginTop: 8,

    boxShadow:
      "0 10px 40px rgba(124,58,237,.35)"
  },

  linkButton: {
    width: "100%",

    marginTop: 18,

    background: "transparent",

    border: "none",

    color: "#93c5fd",

    cursor: "pointer",

    fontSize: 15
  }
};