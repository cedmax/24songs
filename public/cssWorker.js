registerPaint(
  "background",
  class {
    static get inputProperties() {
      return [
        "--background",
        "--main",
        "--accent",
        "--secondary",
        "--transparent",
      ];
    }

    paint(ctx, geom, props) {
      const background = props.get("--background").toString();
      const main = props.get("--main").toString();
      const accent = props.get("--accent").toString();
      const secondary = props.get("--secondary").toString();
      const transparent = props.get("--transparent").toString();

      const rows = [
        [transparent, transparent, secondary, main],
        [main, accent, transparent, secondary],
        [transparent, secondary, main, accent],
        [secondary, main, accent, transparent],
      ];

      let { width, height } = geom;
      const size = 37.5;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      for (let y = 0; y < height + size; y = y + size) {
        for (let x = 0; x < width + size; x = x + size) {
          ctx.beginPath();

          ctx.arc(x, y, size * 0.43, 0, 2 * Math.PI);
          const row = ((y + size) / size) % rows.length;
          const col = ((x + size) / size) % rows[row].length;
          const color = rows[row][col];

          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    }
  }
);
