import React, { useState, useEffect } from "react";

function Currency() {
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    async function fetchCurrencies() {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      );
      const data = await response.json();
      const eurResponse = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
      );
      const eurData = await eurResponse.json();
      const currenciesData = { ...data, ...eurData.eur };
      // console.log(currenciesData);
      setCurrencies(currenciesData);
    }
    fetchCurrencies();
  }, []);

  if (!currencies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Object.entries(currencies).map(([key, value]) => {
        return (
          <div key={key}>
            <p>{key}</p>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Currency;
