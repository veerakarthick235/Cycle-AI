import { useEffect, useRef } from "react";
import { HEALTH_SCORE_LABELS } from "@/utils/constants";

function getScoreConfig(score) {
  for (const key of Object.keys(HEALTH_SCORE_LABELS)) {
    const cfg = HEALTH_SCORE_LABELS[key];
    if (score >= cfg.min && score <= cfg.max) return cfg;
  }
  return HEALTH_SCORE_LABELS.consult;
}

export default function HealthScoreGauge({ score = 0, size = 180 }) {
  const canvasRef = useRef(null);
  const config = getScoreConfig(score);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 16;
    const lineWidth = 14;
    const startAngle = 0.75 * Math.PI;
    const endAngle = 2.25 * Math.PI;

    // Background arc
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = "#f3f0f5";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Animated score arc
    const scoreAngle = startAngle + (score / 100) * (endAngle - startAngle);
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#FF6F91");
    gradient.addColorStop(0.5, config.color);
    gradient.addColorStop(1, "#9D4EDD");

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, scoreAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Score text
    ctx.fillStyle = "#1a1a2e";
    ctx.font = `bold ${size * 0.22}px "DM Sans", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(score, cx, cy - 4);

    // Label text
    ctx.fillStyle = config.color;
    ctx.font = `600 ${size * 0.09}px "DM Sans", sans-serif`;
    ctx.fillText(config.label, cx, cy + size * 0.15);
  }, [score, size, config]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        aria-label={`Cycle Health Score: ${score} - ${config.label}`}
      />
      <p className="text-xs text-gray-400 mt-1">Cycle Health Score</p>
    </div>
  );
}
