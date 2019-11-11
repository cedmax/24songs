const initialYear = 2006;
const now = new Date();
let finalYear =
  now.getMonth() === 11 ? now.getFullYear() : now.getFullYear() - 1;

export default () => {
  const years = new Array(finalYear + 1 - initialYear)
    .fill(null)
    .map(() => finalYear--);

  const data = years.map(year => {
    try {
      const yearData = require(`./data/${year}.json`);
      if (year === now.getFullYear()) {
        yearData.length = now.getDate();
      }

      return yearData;
    } catch (e) {
      return [];
    }
  });

  return [years, data];
};
