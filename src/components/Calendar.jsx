import React, { useState } from "react";
export default function Calendar({ onConfirm }){
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    }
  };

  const isInRange = (day) => {
    if (!rangeStart) return false;

    const date = new Date(currentYear, currentMonth, day);

    if (rangeStart && !rangeEnd) {
      return date.getTime() === rangeStart.getTime();
    }

    return date >= rangeStart && date <= rangeEnd;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const formatDate = (date) => {
    if (!date) return "";

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
  };

  const handleConfirm = () => {
    if (!rangeStart || !rangeEnd) return;

    const formatted = `${formatDate(rangeStart)} até ${formatDate(rangeEnd)}`;

    if (onConfirm) {
      onConfirm(formatted);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
  <div
    style={{
      padding: 15,
      background: "#242424",
      borderRadius: 12,
      color: "white"
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }}
    >
      <button onClick={prevMonth}>◀</button>

      <strong style={{ fontSize: 14 }}>
        {months[currentMonth]} {currentYear}
      </strong>

      <button onClick={nextMonth}>▶</button>
    </div>

    {/* Dias */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {[...Array(daysInMonth)].map((_, index) => {
        const day = index + 1;
        const selected = isInRange(day);

        return (
          <div
            key={day}
            onClick={() => handleClick(day)}
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 6,
              fontSize: 12,
              backgroundColor: selected ? "#007bff" : "transparent",
              color: selected ? "white" : "#ccc"
            }}
          >
            {day}
          </div>
        );
      })}
    </div>

    {/* Botão */}
    <button
      onClick={handleConfirm}
      style={{
        marginTop: 12,
        width: "100%",
        padding: 8,
        fontSize: 13,
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer"
      }}
    >
      Confirmar período
    </button>
  </div>
);
};