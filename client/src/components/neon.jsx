import React from "react";
import "./neonButton.css";

export default function NeonButton({
  label = "Neon",
  color = "#03e9f4",
  hue = 290,
  className = "",
  onClick,
}) {
  const style = {
    "--neon-color": color,
    "--neon-hue": `${hue}deg`,
  };

  return (
    <button
      type="button"
      className={`btn btn--neon ${className}`.trim()}
      style={style}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {label}
    </button>
  );
}
