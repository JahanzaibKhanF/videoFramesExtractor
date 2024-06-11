function calculate(a, b) {
  const value1 = Number(a);
  const value2 = Number(b);
  let results = [];
  for (let i = 0; i < 15; i++) {
    results.push({
      value1: value1 + i,
      value2: value2 + i,
      method: "addition",

      ans: value1 + i + value2 + i,
    });
  }
  return {
    results: results,
  };
}
module.exports = calculate;
