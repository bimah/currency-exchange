const Currency = {
  format: (lang, currency, amount) => new Intl.NumberFormat(lang, { style: 'currency', currency }).format(amount),
  sortDecimal: (number, decimals) => (number % 1 === 0 ? number : number.toFixed(decimals)),
  posToNeg: num => -Math.abs(num),
  restrictInputValue: (value, inputValue) => {
    const doubleRegex = /^(?=.*[1-9])\d*(?:\.|\.\d{1,2})?\s*$/;

    const inputNumber = value.charAt(0) === '-' || value.charAt(0) === '+' ? value.substring(2) : value;
    return doubleRegex.test(inputNumber) || inputNumber === '' ? inputNumber : inputValue;
  }
};

export default Currency;
