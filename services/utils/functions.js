const fs = require("fs");
const path = require("path");

let functions = {};

//read json file
functions.readJsonFile = () => {
  const pathJson = path.join(__dirname, "../../public/json/quotes.json");
  const rawData = fs.readFileSync(pathJson);
  let quotes = JSON.parse(rawData);

  quotes = quotes.filter(
    (quote) =>
      quote.brand !== "Mazda" &&
      (quote.company === "Seguros Atlas" ||
        quote.company === "Qualitas" ||
        quote.company === "MAPFRE")
  );
  return quotes;
};

//Remove coma price to compare prices
functions.removeComaPrice = (filteredQuotes) => {
  return filteredQuotes.map((quote) => {
    const array = quote.price.split(",");
    quote.price = array[0] + array[1];

    return quote;
  });
};

module.exports = functions;
