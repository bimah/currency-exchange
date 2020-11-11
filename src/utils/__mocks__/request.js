const currenciesRates = {
  rates: {
    EUR: 1.1212899319
  }
};

const Request = {
  get: () => new Promise(resolve => process.nextTick(() => resolve(currenciesRates)))
};

export default Request;
