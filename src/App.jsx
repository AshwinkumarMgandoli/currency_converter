import React, { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const handleFromCurrencyChange = (currency) => {
    setFrom(currency);
    if (currency === to) {
      setTo(from);
    }
  };

  const handleToCurrencyChange = (currency) => {
    setTo(currency);
    if (currency === from) {
      setFrom(to);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-800 to-indigo-800 text-gray-800">
      <div className="w-full max-w-md mx-auto p-8 rounded-lg bg-white shadow-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-6">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={handleFromCurrencyChange}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
              inputColor="bg-blue-900 text-white"
            />
          </div>
          <div className="mb-6">
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 hover:bg-blue-600 transform hover:scale-105"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={handleToCurrencyChange}
              selectCurrency={to}
              amountDisable
              inputColor="bg-blue-900 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md transition duration-300 hover:bg-blue-600"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
