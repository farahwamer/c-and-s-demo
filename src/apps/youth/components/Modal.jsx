import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        backgroundColor: "rgba(26,26,26,0.5)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-slide-up"
        style={{
          width: '100%',
          maxWidth: '672px',
          maxHeight: '85vh',
          overflowY: 'auto',
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          margin: '16px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 16px 0' }}>
          <button
            onClick={onClose}
            style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: '8px 32px 32px' }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
