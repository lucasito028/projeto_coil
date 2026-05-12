import { useState } from "react";

export default function PriceModal({
  onConfirm
}) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleConfirm = () => {
    if (!min && !max) return;

    let texto = "";

    if (min && max) {
      texto =
        `Valor mínimo: R$ ${min} | ` +
        `Valor máximo: R$ ${max}`;
    } else if (min) {
      texto = `Valor mínimo: R$ ${min}`;
    } else {
      texto = `Valor máximo: R$ ${max}`;
    }

    onConfirm(texto);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Definir faixa de preço
      </h2>

      <input
        type="number"
        placeholder="Valor mínimo"
        value={min}
        onChange={(e) =>
          setMin(e.target.value)
        }
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Valor máximo"
        value={max}
        onChange={(e) =>
          setMax(e.target.value)
        }
        style={styles.input}
      />

      <button
        onClick={handleConfirm}
        style={styles.button}
      >
        Confirmar valores
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 18
  },

  title: {
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 10
  },

  input: {
    width: "100%",
    height: 68,

    padding: "0 22px",

    borderRadius: 18,

    border:
      "1px solid rgba(255,255,255,.08)",

    background:
      "rgba(255,255,255,.05)",

    color: "white",

    fontSize: 16,

    outline: "none",

    boxSizing: "border-box"
  },

  button: {
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
  }
};