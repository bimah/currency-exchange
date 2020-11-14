import CurrencyRates from './mock-rates.json';

const Request = {
  get: () => new Promise(resolve => process.nextTick(() => resolve(CurrencyRates)))
};

export default Request;
