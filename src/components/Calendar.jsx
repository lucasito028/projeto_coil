import React, { useState } from "react";

export default function Calendar({ onConfirm }) {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )
  );

  const [rangeStart, setRangeStart] =
    useState(null);

  const [rangeEnd, setRangeEnd] =
    useState(null);

  const currentYear =
    currentDate.getFullYear();

  const currentMonth =
    currentDate.getMonth();

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  const getDaysInMonth = (
    month,
    year
  ) => {
    return new Date(
      year,
      month + 1,
      0
    ).getDate();
  };

  const handleClick = (day) => {
    const date = new Date(
      currentYear,
      currentMonth,
      day
    );

    if (
      !rangeStart ||
      (rangeStart && rangeEnd)
    ) {
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

    const date = new Date(
      currentYear,
      currentMonth,
      day
    );

    if (rangeStart && !rangeEnd) {
      return (
        date.getTime() ===
        rangeStart.getTime()
      );
    }

    return (
      date >= rangeStart &&
      date <= rangeEnd
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth + 1,
        1
      )
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth - 1,
        1
      )
    );
  };

  const formatDate = (date) => {
    if (!date) return "";

    const day = date.getDate();

    const month =
      months[date.getMonth()];

    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
  };

  const handleConfirm = () => {
    if (!rangeStart || !rangeEnd)
      return;

    const formatted =
      `${formatDate(rangeStart)} ` +
      `até ${formatDate(rangeEnd)}`;

    if (onConfirm) {
      onConfirm(formatted);
    }
  };

  const daysInMonth = getDaysInMonth(
    currentMonth,
    currentYear
  );

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <button
          onClick={prevMonth}
          style={styles.navButton}
        >
          ◀
        </button>

        <h2 style={styles.monthTitle}>
          {months[currentMonth]}{" "}
          {currentYear}
        </h2>

        <button
          onClick={nextMonth}
          style={styles.navButton}
        >
          ▶
        </button>
      </div>

      {/* GRID */}
      <div style={styles.daysGrid}>
        {[...Array(daysInMonth)].map(
          (_, index) => {
            const day = index + 1;

            const selected =
              isInRange(day);

            return (
              <div
                key={day}
                onClick={() =>
                  handleClick(day)
                }
                style={{
                  ...styles.day,

                  ...(selected
                    ? styles.selectedDay
                    : {})
                }}
              >
                {day}
              </div>
            );
          }
        )}
      </div>

      {/* RANGE INFO */}
      {(rangeStart || rangeEnd) && (
        <div style={styles.rangeInfo}>
          {rangeStart &&
            formatDate(rangeStart)}

          {rangeEnd &&
            ` → ${formatDate(
              rangeEnd
            )}`}
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={handleConfirm}
        style={styles.confirmButton}
      >
        Confirmar período
      </button>
    </div>
  );
}

const styles = {
  container: {
    color: "white"
  },

  header: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: 30
  },

  monthTitle: {
    fontSize: 28,

    fontWeight: 800,

    margin: 0
  },

  navButton: {
    width: 48,
    height: 48,

    borderRadius: 16,

    border: "none",

    background:
      "rgba(255,255,255,.06)",

    color: "white",

    fontSize: 18,

    cursor: "pointer",

    transition: ".2s ease"
  },

  daysGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(7, 1fr)",

    gap: 12
  },

  day: {
    height: 54,

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    borderRadius: 16,

    cursor: "pointer",

    fontWeight: 600,

    color: "#cbd5e1",

    transition: ".2s ease",

    background: "transparent",

    userSelect: "none"
  },

  selectedDay: {
    background:
      "linear-gradient(90deg,#2563eb,#7c3aed)",

    color: "white",

    boxShadow:
      "0 8px 30px rgba(124,58,237,.35)"
  },

  rangeInfo: {
    marginTop: 25,

    padding: 18,

    borderRadius: 18,

    background:
      "rgba(255,255,255,.05)",

    border:
      "1px solid rgba(255,255,255,.06)",

    color: "#e2e8f0",

    lineHeight: 1.6,

    fontSize: 15
  },

  confirmButton: {
    marginTop: 28,

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

    boxShadow:
      "0 10px 40px rgba(124,58,237,.35)"
  }
};