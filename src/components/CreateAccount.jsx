import { useState } from "react";

export default function CreateAccount({
  onChangeScreen
}) {
  const [step, setStep] =
    useState(1);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [error, setError] =
    useState("");

  const nextStep = () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleCreate = () => {
    console.log({
      email,
      password,
      name,
      description
    });
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>
        Criar conta
      </h1>

      <p style={styles.subtitle}>
        Monte seu perfil
      </p>

      {step === 1 && (
        <>
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
              placeholder="Senha"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={styles.input}
            />
          </div>

          <div style={styles.inputWrapper}>
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
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
            onClick={nextStep}
            style={styles.mainButton}
          >
            Continuar
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div style={styles.inputWrapper}>
            <input
              placeholder="Seu nome"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={styles.input}
            />
          </div>

          <div
            style={{
              ...styles.inputWrapper,
              height: 140,
              alignItems: "flex-start",
              paddingTop: 20
            }}
          >
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              style={styles.textarea}
            />
          </div>

          <button
            onClick={handleCreate}
            style={styles.mainButton}
          >
            Criar conta
          </button>
        </>
      )}

      <button
        onClick={onChangeScreen}
        style={styles.linkButton}
      >
        Já tenho conta
      </button>
    </div>
  );
}

const styles = {
  card: {
    minWidth: "100%",

    background: "rgba(255,255,255,0.06)",

    border: "1px solid rgba(255,255,255,0.08)",

    backdropFilter: "blur(20px)",

    borderRadius: 32,

    padding: 40,

    boxShadow: "0 20px 80px rgba(0,0,0,.35)"
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

  textarea: {
    width: "100%",

    height: "100%",

    resize: "none",

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
  },

  error: {
    color: "#f87171",

    marginBottom: 15
  }
};