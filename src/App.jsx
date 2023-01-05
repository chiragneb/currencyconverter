import './App.css';
import CurrencyInput from './CurrencyInput';
import { useEffect, useState } from 'react';
import axios from 'axios';




function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [rates, setRates] = useState([]);

  
  useEffect(() => {
    axios.get('https://api.apilayer.com/fixer/latest?apikey=WXI3Suzg65gwhRs77Sl803g9E3gvhfok')
         .then(response => {
          setRates(response.data.rates);
         })
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);


  function roundUp(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(roundUp(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(roundUp(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(roundUp(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(roundUp(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

 
  return (
    <section className="input-container">
    <div className="input-div">
      <main className="currency-converter-main">
      </main>
      <h1 className="currency-converter">Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1} />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2} />
              

    </div>
    </section>
  );
}

export default App;