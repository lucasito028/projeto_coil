import { useState } from "react";

export default function PriceModal({ onConfirm }) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleConfirm = () => {
    if (!min && !max) return;

    let texto = "";

    if (min && max) {
      texto = `Valor mínimo: R$ ${min} | Valor máximo: R$ ${max}`;
    } else if (min) {
      texto = `Valor mínimo: R$ ${min}`;
    } else if (max) {
      texto = `Valor máximo: R$ ${max}`;
    }

    onConfirm(texto);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3>Definir faixa de preço</h3>

      <input
        type="number"
        placeholder="Valor mínimo"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        style={{ padding: 10 }}
      />

      <input
        type="number"
        placeholder="Valor máximo"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        style={{ padding: 10 }}
      />

      <button
        onClick={handleConfirm}
        style={{
          padding: 10,
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Confirmar valores
      </button>
    </div>
  );
}