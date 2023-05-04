import React, { useState, useEffect } from "react";

function Currency() {
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    async function fetchCurrencies() {
      const [dataResponse, eurResponse] = await Promise.all([
        fetch(
          "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
        ),
        fetch(
          "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
        ),
      ]);
      const [data, eurData] = await Promise.all([
        dataResponse.json(),
        eurResponse.json(),
      ]);
      const eurRates = eurData.eur;
      Object.entries(data).forEach(([k, v]) => {
        data[k] = { devise: v, rate: eurRates[k] };
      });
      // console.log(data);
      setCurrencies(data);
    }
    fetchCurrencies();
  }, []);

  if (!currencies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="positionDevise">
      {Object.entries(currencies).map(([key, value]) => {
        return (
          <div className="formDevise" key={key}>
            <ul>
              {/* <p>{key}</p> */}
              <li>Devise : {value.devise}</li>
              <li>Valeur : {value.rate}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Currency;
