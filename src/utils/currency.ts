const Currency = {
  format: (lang: string, currency: string, amount: number): string => new Intl.NumberFormat(lang, { style: 'currency', currency }).format(amount),
  sortDecimal: (value: number, decimals: number): string => (value % 1 === 0 ? String(value) : String(value.toFixed(decimals))),
  posToNeg: (num: number): number => -Math.abs(num),
  restrictInputValue: (value: string, inputValue: string): string => {
    const doubleRegex = /^(?=.*[1-9])\d*(?:\.|\.\d{1,2})?\s*$/;

    const inputNumber: string = value.charAt(0) === '-' || value.charAt(0) === '+' ? value.substring(2) : value;
    return doubleRegex.test(inputNumber) || inputNumber === '' ? inputNumber : inputValue;
  }
};

export default Currency;
