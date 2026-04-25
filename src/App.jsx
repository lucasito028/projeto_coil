import { useState } from "react";
import { buscarLugares } from "./api/api";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
function App() {

  const [cidade, setCidade] = useState("");
  const [categorias, setCategorias] = useState("");
  const [estilo, setEstilo] = useState("");
  const [periodoSelecionado, setPeriodoSelecionado] = useState("");

  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const [openCalendar, setOpenCalendar] = useState(false);

  const buscar = async () => {
    if (!cidade) {
      setResultado("Informe uma cidade");
      return;
    }

    setLoading(true);
    setResultado("");

    try {
      console.log("Buscando lugares para:", { cidade, categorias, estilo, periodoSelecionado });
      const resposta = await buscarLugares(
        cidade,
        categorias,
        estilo,
        periodoSelecionado
      );

      setResultado(resposta);
    } catch (erro) {
      console.error(erro);
      setResultado("Erro ao buscar lugares");
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial", maxWidth: 600 }}>
      <h1>🌍 Planejador de Viagem com IA</h1>

      {/* Cidade */}
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          style={{ padding: 10, width: "100%" }}
        />
      </div>

      {/* Categorias */}
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Categorias (ex: comida, museus, natureza)"
          value={categorias}
          onChange={(e) => setCategorias(e.target.value)}
          style={{ padding: 10, width: "100%" }}
        />
      </div>

      {/* Estilo */}
      <div style={{ marginBottom: 10 }}>
        <select
          value={estilo}
          onChange={(e) => setEstilo(e.target.value)}
          style={{ padding: 10, width: "100%" }}
        >
          <option value="">Estilo de viagem</option>
          <option value="econômico">Econômico</option>
          <option value="luxo">Luxo</option>
        </select>
      </div>

      {/* Tempo */}
      <div style={{ marginBottom: 10 }}>
        {/* Modal com Calendar */}
        <button
          onClick={() => setOpenCalendar(true)}
          style={{ padding: 10, backgroundColor: "#28a745", color: "white" }}
        >
          📅 Abrir Calendário
        </button>
        <Modal
          isOpen={openCalendar}
          onClose={() => setOpenCalendar(false)}
        >
          <Calendar
            onConfirm={(valor) => {
              setPeriodoSelecionado(valor);
              setOpenCalendar(false);
            }}
          />
        </Modal>
      </div>

      <p>📅 Período selecionado: {periodoSelecionado}</p>

      {/* Botão */}
      <button
        onClick={buscar}
        style={{
          padding: 12,
          width: "100%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Buscando..." : "Buscar roteiro inteligente"}
      </button>

      {/* Resultado */}
      <pre
        style={{
          marginTop: 20,
          padding: 20,
          whiteSpace: "pre-wrap"
        }}
      >
        {resultado}
      </pre>
    </div>
  );
}

export default App;