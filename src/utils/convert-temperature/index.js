// Kelvin to Celsius
const ktoc = t => Number(t - 273.15).toFixed(2);

// Kelvin to Farenheit
const ktof = t => Number(t * 9 / 5 - 459.67).toFixed(2);

export default { ktoc, ktof };
export { ktoc, ktof };
