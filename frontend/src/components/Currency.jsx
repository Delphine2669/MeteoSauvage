import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Currency({ citySearch }) {
  const [currencies, setCurrencies] = useState(null);
  const [filteredCurrencies, setFilteredCurrencies] = useState(null);

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
      setCurrencies(data);
      setFilteredCurrencies(data);
    }
    fetchCurrencies();
  }, [citySearch]);

  if (!currencies) {
    return <div>Loading...</div>;
  }

  if (Object.keys(filteredCurrencies).length === 0) {
    return <div>Pas de devises correspondante.</div>;
  }

  return (
    <figure className="currency">
      <h2 className="component-title currency-title">Taux de change</h2>
      <div className="currency-form">
        {Object.entries(filteredCurrencies).map(([key, value]) => {
          if (
            citySearch &&
            value.devise.toLowerCase().indexOf(citySearch.toLowerCase()) === -1
          ) {
            return null; // Skip rendering the currency
          }
          return (
            <div className="form-currency" key={key}>
              <ul className="form-ul">
                <li className="form-li">Devise: {value.devise}</li>
                <li className="form-li">Valeur: {value.rate}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </figure>
  );
}

Currency.propTypes = {
  citySearch: PropTypes.string.isRequired,
};

export default Currency;
