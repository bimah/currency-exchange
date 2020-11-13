const Currency = {
  format: (lang: string, currency: string, amount: number): string => new Intl.NumberFormat(lang, { style: 'currency', currency }).format(amount),
  sortDecimal: (value: number, decimals: number): number => (number % 1 === 0 ? number : number.toFixed(decimals)),
  posToNeg: (num: number): number => -Math.abs(num),
  restrictInputValue: (value: string, inputValue: string): number => {
    const doubleRegex = /^(?=.*[1-9])\d*(?:\.|\.\d{1,2})?\s*$/;

    const inputNumber: string = value.charAt(0) === '-' || value.charAt(0) === '+' ? value.substring(2) : value;
    return doubleRegex.test(inputNumber) || inputNumber === '' ? Number(inputNumber) : Number(inputValue);
  }
};

export default Currency;
