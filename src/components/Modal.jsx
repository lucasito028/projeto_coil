export default function Modal({
  isOpen,
  onClose,
  children
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={styles.overlay}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={styles.modal}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          style={styles.closeButton}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,

    width: "100%",
    height: "100%",

    background:
      "rgba(0,0,0,0.55)",

    backdropFilter: "blur(12px)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: 30,

    zIndex: 999
  },

  modal: {
    position: "relative",

    width: "100%",
    maxWidth: 850,

    maxHeight: "90vh",
    overflowY: "auto",

    padding: 35,

    borderRadius: 32,

    background:
      "rgba(15,23,42,0.72)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    backdropFilter: "blur(24px)",

    boxShadow:
      "0 20px 80px rgba(0,0,0,.45)",

    color: "white",

    boxSizing: "border-box"
  },

  closeButton: {
    position: "absolute",

    top: 18,
    right: 18,

    width: 44,
    height: 44,

    borderRadius: 14,

    border: "none",

    background:
      "rgba(255,255,255,.06)",

    color: "white",

    fontSize: 18,

    cursor: "pointer",

    transition: ".2s ease",

    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};