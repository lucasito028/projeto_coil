export default function Modal ({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "black",
          padding: 20,
          borderRadius: 10,
          maxHeight: "80%",
          overflowY: "auto",
          width: "90%",
          maxWidth: 800
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            float: "right",
            border: "none",
            background: "transparent",
            fontSize: 18,
            cursor: "pointer"
          }}
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};