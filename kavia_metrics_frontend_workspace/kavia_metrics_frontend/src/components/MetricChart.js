import React, { useRef, useEffect } from 'react';
import './MetricChart.css';

// PUBLIC_INTERFACE
function MetricChart({
  labels = [],
  data = [],
  title = '',
  strokeColor = 'var(--primary)',
  fillColor = 'rgba(255,149,0,0.09)',
  yMax,
  minTicks = 4
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !labels.length || !data.length) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    // Find y-range
    let dMin = Math.min(...data);
    let dMax = Math.max(...data, dMin + 1);
    if (typeof yMax === 'number') dMax = Math.max(dMax, yMax);
    if (dMin === dMax) dMin = 0; // Avoid single-point ranges

    // Nice y-axis ticks
    const ticks = [];
    let tickCount = Math.max(minTicks, 3);
    let step = (dMax - dMin) / (tickCount - 1);
    for (let i = 0; i < tickCount; i++) ticks.push(dMin + i * step);

    // Draw Y gridlines
    ctx.strokeStyle = '#eceef5';
    ctx.lineWidth = 1;
    ctx.font = '12px Inter, Arial';
    ctx.fillStyle = '#b5bfcb';
    for (let i = 0; i < ticks.length; i++) {
      const y = 36 + ((h - 60) * (1 - (ticks[i] - dMin) / (dMax - dMin)));
      ctx.beginPath();
      ctx.moveTo(48, y);
      ctx.lineTo(w - 8, y);
      ctx.stroke();

      ctx.fillText(ticks[i].toFixed(0), 10, y + 5);
    }

    // Draw line chart
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = 48 + ((w - 60) * (i / Math.max(1, data.length - 1)));
      const y = 36 + ((h - 60) * (1 - (d - dMin) / (dMax - dMin)));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill area under curve
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = 48 + ((w - 60) * (i / Math.max(1, data.length - 1)));
      const y = 36 + ((h - 60) * (1 - (d - dMin) / (dMax - dMin)));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(48 + ((w - 60) * ((data.length - 1) / Math.max(1, data.length - 1))), h - 24);
    ctx.lineTo(48, h - 24);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Draw X-axis (labels)
    ctx.font = '13px Inter, Arial';
    ctx.fillStyle = '#444';
    labels.forEach((lbl, i) => {
      const x = 48 + ((w - 60) * (i / Math.max(1, labels.length - 1)));
      ctx.fillText(lbl, x - 16, h - 8);
    });
  }, [labels, data, strokeColor, fillColor, minTicks, yMax]);

  return (
    <div className="metric-chart-card">
      <div className="metric-chart-title">{title}</div>
      <canvas
        ref={canvasRef}
        width={380} height={170}
        className="metric-chart-canvas"
        style={{ width: '100%', height: 170 }}
        aria-label={title}
      />
    </div>
  );
}
export default MetricChart;
