import { useState } from "react";
import { createUser } from "../backend/auth";

export default function CreateUser() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function nextStep(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha email e senha");
      return;
    }

    setError("");
    setStep(2);
  }

  async function handleCreateUser(e) {
    e.preventDefault();

    if (!name) {
      setError("Nome é obrigatório");
      return;
    }
    if (!description) {
      setError("Descrição é obrigatória");
      return;
    }

    setLoading(true);
    setError("");

    const response = await createUser(name, email, password, description);

    if (!response.success) {
      setError(response.message);
      setLoading(false);
      return;
    }

    // sucesso → redireciona ou loga automaticamente
    window.location.href = "/";
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>Criar Conta</h1>

      {step === 1 && (
        <form onSubmit={nextStep}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Próximo</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCreateUser}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setStep(1)}
            style={{ marginRight: 10 }}
          >
            Voltar
          </button>

          <button type="submit">
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}