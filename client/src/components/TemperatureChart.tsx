import { useEffect, useRef } from "react";

export default function TemperatureChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw temperature curve
    const hours = [8, 10, 12, 14, 16, 18, 20, 22];
    const temperatures = [18, 19, 21, 22, 20, 19, 18, 17];

    // Normalize data to canvas dimensions
    const padding = 30;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;

    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);
    const tempRange = maxTemp - minTemp + 2; // Add padding

    // Draw x-axis labels (hours)
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#6B7280";
    ctx.textAlign = "center";

    hours.forEach((hour, i) => {
      const x = padding + (i / (hours.length - 1)) * chartWidth;
      ctx.fillText(hour.toString(), x, rect.height - 10);
    });

    // Draw the curve
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#3B4CCA";

    temperatures.forEach((temp, i) => {
      const x = padding + (i / (temperatures.length - 1)) * chartWidth;
      const normalizedTemp = 1 - (temp - minTemp + 1) / tempRange;
      const y = padding + normalizedTemp * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        // Create a smooth curve
        const prevX =
          padding + ((i - 1) / (temperatures.length - 1)) * chartWidth;
        const prevY =
          padding +
          (1 - (temperatures[i - 1] - minTemp + 1) / tempRange) * chartHeight;

        const cpX1 = prevX + (x - prevX) / 3;
        const cpX2 = prevX + (2 * (x - prevX)) / 3;

        ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y);
      }
    });

    ctx.stroke();
  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
