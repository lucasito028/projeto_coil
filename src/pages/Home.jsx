import { useState } from "react";
import { buscarLugares } from "../backend/api";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";
import PriceModal from "../components/PriceModal";

function Home() {
  const [cidade, setCidade] = useState("");
  const [categorias, setCategorias] = useState("");
  const [estilo, setEstilo] = useState("");
  const [periodoSelecionado, setPeriodoSelecionado] = useState("");
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [faixaPreco, setFaixaPreco] = useState("");

  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const [openCalendar, setOpenCalendar] = useState(false);

  // CONTROLA A TROCA DE TELA
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const buscar = async () => {
    if (!cidade) {
      setResultado("Informe uma cidade");
      return;
    }

    setLoading(true);

    // ESCONDE FORM E MOSTRA TELA RESULTADO
    setMostrarResultado(true);

    try {
      const resposta = await buscarLugares(
        cidade,
        categorias,
        estilo,
        periodoSelecionado,
        faixaPreco
      );

      setResultado(resposta);
    } catch (erro) {
      console.error(erro);
      setResultado("Erro ao buscar lugares");
    }

    setLoading(false);
  };

  const voltarHome = () => {
    setMostrarResultado(false);
    setResultado("");
  };

  return (
    <div style={styles.page}>
      {/* BG EFFECT */}
      <div style={styles.blur1}></div>
      <div style={styles.blur2}></div>

      {/* HERO */}
      {!mostrarResultado && (
        <div style={styles.hero}>
          <div style={styles.card}>
            <h1 style={styles.title}>
              🌍 Planeje viagens incríveis com IA
            </h1>

            <p style={styles.subtitle}>
              Descubra roteiros inteligentes, lugares imperdíveis
              e experiências personalizadas em segundos.
            </p>

            {/* INPUT CIDADE */}
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>📍</span>

              <input
                placeholder="Para onde você quer viajar?"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* INPUT CATEGORIAS */}
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>✨</span>

              <input
                placeholder="Comida, natureza, museus..."
                value={categorias}
                onChange={(e) => setCategorias(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* BUTTONS */}
            <div style={styles.row}>
              <button
                onClick={() => setOpenCalendar(true)}
                style={styles.secondaryButton}
              >
                📅 Datas
              </button>

              <button
                onClick={() => setOpenPriceModal(true)}
                style={styles.secondaryButton}
              >
                💰 Orçamento
              </button>
            </div>

            {/* INFO */}
            <div style={styles.infoArea}>
              <p style={styles.infoText}>
                📅 {periodoSelecionado || "Nenhuma data selecionada"}
              </p>

              <p style={styles.infoText}>
                💰 {faixaPreco || "Sem faixa de preço"}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={buscar}
              style={styles.mainButton}
            >
              {loading
                ? "Buscando roteiro..."
                : "✨ Gerar roteiro inteligente"}
            </button>
          </div>
        </div>
      )}

      {/* RESULTADO */}
      {mostrarResultado && (
        <div style={styles.resultContainer}>
          {/* BOTÃO VOLTAR */}
          <button
            onClick={voltarHome}
            style={styles.backButton}
          >
            ✕
          </button>

          {/* HEADER */}
          <div style={styles.resultHeader}>
            <h1 style={styles.resultTitle}>
              ✈️ Seu roteiro para {cidade}
            </h1>

            <div style={styles.badges}>
              <div style={styles.badge}>
                📅 {periodoSelecionado}
              </div>

              <div style={styles.badge}>
                💰 {faixaPreco}
              </div>
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div style={styles.loadingArea}>
              <div style={styles.loader}></div>

              <h2>Planejando sua viagem...</h2>

              <p>
                Nossa IA está montando o melhor roteiro
                para você.
              </p>
            </div>
          ) : (
            <div style={styles.resultCard}>
              <pre style={styles.resultText}>
                {resultado}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* MODAL PREÇO */}
      <Modal
        isOpen={openPriceModal}
        onClose={() => setOpenPriceModal(false)}
      >
        <PriceModal
          onConfirm={(valor) => {
            setFaixaPreco(valor);
            setOpenPriceModal(false);
          }}
        />
      </Modal>

      {/* MODAL CALENDÁRIO */}
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
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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

  hero: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 2
  },

  card: {
    width: "100%",
    maxWidth: 700,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    borderRadius: 32,
    padding: 40,
    boxShadow: "0 20px 80px rgba(0,0,0,.35)"
  },

  title: {
    fontSize: 52,
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 20
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 35
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: "0 18px",
    marginBottom: 18,
    height: 65
  },

  icon: {
    fontSize: 20,
    marginRight: 12
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: 16
  },

  row: {
    display: "flex",
    gap: 15,
    marginTop: 10,
    marginBottom: 25
  },

  secondaryButton: {
    flex: 1,
    height: 55,
    border: "none",
    borderRadius: 16,
    background: "rgba(255,255,255,0.08)",
    color: "white",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600
  },

  infoArea: {
    marginBottom: 25
  },

  infoText: {
    color: "#cbd5e1",
    marginBottom: 10
  },

  mainButton: {
    width: "100%",
    height: 65,
    border: "none",
    borderRadius: 18,
    background:
      "linear-gradient(90deg,#2563eb,#7c3aed)",
    color: "white",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 40px rgba(124,58,237,.4)"
  },

  /* RESULTADO */

  resultContainer: {
    width: "100%",
    maxWidth: 1100,
    position: "relative",
    zIndex: 2
  },

  backButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 14,
    border: "none",
    background: "rgba(255,255,255,.08)",
    color: "white",
    cursor: "pointer",
    fontSize: 20
  },

  resultHeader: {
    marginBottom: 40
  },

  resultTitle: {
    fontSize: 52,
    marginBottom: 20
  },

  badges: {
    display: "flex",
    gap: 15
  },

  badge: {
    background: "rgba(255,255,255,.08)",
    padding: "12px 18px",
    borderRadius: 14,
    color: "#e2e8f0"
  },

  loadingArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100
  },

  loader: {
    width: 70,
    height: 70,
    border: "6px solid rgba(255,255,255,.15)",
    borderTop: "6px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: 30
  },

  resultCard: {
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 28,
    padding: 40,
    backdropFilter: "blur(20px)"
  },

  resultText: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.8,
    color: "#f8fafc",
    fontSize: 16
  }
};

export default Home;