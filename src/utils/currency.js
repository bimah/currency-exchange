const Currency = {
  format: (lang, currency, amount) => new Intl.NumberFormat(lang, { style: 'currency', currency }).format(amount),
  sortDecimal: (number, decimals) => (number % 1 === 0 ? number : number.toFixed(decimals))
};

export default Currency;
