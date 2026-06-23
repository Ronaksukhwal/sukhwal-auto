import React from 'react';

/**
 * LiquidButton - A button component with SVG gooey liquid animation on hover.
 */
export default function LiquidButton({ children, onClick, type = "button", className = "", disabled = false }) {
  return (
    <div className="gooey-container" style={{ opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
      <button 
        type={type} 
        onClick={onClick} 
        disabled={disabled}
        className={`liquid-btn ${className}`}
      >
        {children}
      </button>
      <div className="liquid-btn-blobs">
        <span className="liquid-btn-blob"></span>
        <span className="liquid-btn-blob"></span>
        <span className="liquid-btn-blob"></span>
        <span className="liquid-btn-blob"></span>
        <span className="liquid-btn-blob"></span>
      </div>
    </div>
  );
}
