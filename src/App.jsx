import { useState } from "react";
import { buscarLugares } from "./api/api";

function App() {

  const [cidade, setCidade] = useState("");
  const [categorias, setCategorias] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const buscar = async () => {
    setLoading(true);

    try {

      const resposta = await buscarLugares(cidade, categorias);

      setResultado(resposta);

    } catch (erro) {
      console.error(erro);
      setResultado("Erro ao buscar lugares");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>

      <h1>🌍 Planejador de Viagem com IA</h1>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          style={{ padding: 10, width: 300 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Categorias (ex: comida, museus, natureza)"
          value={categorias}
          onChange={(e) => setCategorias(e.target.value)}
          style={{ padding: 10, width: 300 }}
        />
      </div>

      <button onClick={buscar} style={{ padding: 10 }}>
        Buscar
      </button>

      {loading && <p>Buscando...</p>}

      <pre style={{ marginTop: 20 }}>
        {resultado}
      </pre>

    </div>
  );
}

export default App;