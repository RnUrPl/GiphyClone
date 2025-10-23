import React from "react";

export default function GiphyishLoader({
  size = 120,
  speed = 1.1,
  label = "Загрузка GIF...",
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-white"
      style={{
        "--speed": `${speed}s`,
      }}
    >
      {/* === Точки загрузки === */}
      <div
        className="relative flex gap-2 justify-center items-end"
        style={{ height: `${size / 3}px` }}
        role="status"
        aria-live="polite"
        aria-label={label}
      >
        <span
          className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-[dot-jump_var(--speed)_ease-in-out_infinite]"
          style={{ animationDelay: "calc(var(--speed) * -0.12)" }}
        ></span>
        <span
          className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-[dot-jump_var(--speed)_ease-in-out_infinite]"
          style={{ animationDelay: "calc(var(--speed) * -0.05)" }}
        ></span>
        <span
          className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-400 animate-[dot-jump_var(--speed)_ease-in-out_infinite]"
          style={{ animationDelay: "calc(var(--speed) * 0.05)" }}
        ></span>
      </div>

      <p className="text-sm opacity-80 mt-3">{label}</p>

      {/* === Анимация === */}
      <style>{`
        @keyframes dot-jump {
          0% { transform: translateY(0) scaleY(1); opacity: 0.9; }
          40% { transform: translateY(-18px) scaleY(1.05); opacity: 1; }
          80%, 100% { transform: translateY(0) scaleY(1); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
