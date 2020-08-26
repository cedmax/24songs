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
      const background = props.get("--background");
      const main = props.get("--main");
      const accent = props.get("--accent");
      const secondary = props.get("--secondary");
      const transparent = props.get("--transparent");

      const rows = [
        [transparent, transparent, secondary, main],
        [main, accent, transparent, secondary],
        [transparent, secondary, main, accent],
        [secondary, main, accent, transparent],
      ];
      const size = 37.5;

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, geom.width, geom.height);

      for (let y = -size; y < geom.height + size; y = y + size) {
        for (let x = -size; x < geom.width + size; x = x + size) {
          ctx.beginPath();

          ctx.arc(x, y, size * 0.43, 0, 2 * Math.PI, false);
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
