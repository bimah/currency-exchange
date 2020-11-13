# currency-exchange

Simple currency exchange:
* Pull FX rates from an [external source](https://exchangeratesapi.io), refreshing every 10 seconds.
* Contain at least three currency accounts (USD, EUR, GBP).
* Option to make exchanges between accounts.
* Contains two input on the exchange screen for both accounts. Each input is been validated to only allow numbers with two decimals.
* Gives necessary information: exchange rate and account balance.

## Technical specification

* The application is written in React with Webpack as module bundler, Babel as a compiler and Typescript.
* Jest and React Testing Library are used to test the application.

### Running the application

**Install dependencies**

```
npm i
```

**Run the application locally**

```
npm start
```

*the application will open automatically on http://0.0.0.0:8080/*


**Building for propuction**
```
npm run build
```

**Running test**
```
npm run test
```
or
```
npm run test:coverage
```
