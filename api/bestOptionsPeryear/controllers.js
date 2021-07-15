const fs = require("fs");
const path = require("path");

let controllers = {};

controllers.bestOptionsPerYear = async (req, res) => {
  try {
    const year = Number(req.params.year);
    console.log(year);
    let bestOptions = {};
    // read json file
    const pathJson = path.join(__dirname, "../../public/json/quotes.json");
    const rawData = fs.readFileSync(pathJson);
    const quotes = JSON.parse(rawData);

    let filteredQuotes = quotes.filter(
      (quote) =>
        (quote.brand === "Chevrolet" ||
          quote.brand === "Dodge" ||
          quote.brand === "Ford" ||
          quote.brand === "GMC" ||
          quote.brand === "Honda") &&
        (quote.company === "Seguros Atlas" ||
          quote.company === "Qualitas" ||
          quote.company === "MAPFRE")
    );

    filteredQuotes = removeComaPrice(filteredQuotes);

    //compare and get best option per coverage type
    const bestOptionRC = getBestOptionByType(filteredQuotes, year, "RC");
    const bestOptionLow = getBestOptionByType(filteredQuotes, year, "Low");
    const bestOptionMid = getBestOptionByType(filteredQuotes, year, "Mid");
    const bestOptionHigh = getBestOptionByType(filteredQuotes, year, "High");

    bestOptions.RC = bestOptionRC;
    bestOptions.Low = bestOptionLow;
    bestOptions.Mid = bestOptionMid;
    bestOptions.High = bestOptionHigh;

    res.status(200).json({
      error: false,
      message: "Done",
      bestOptions,
    });
  } catch (error) {
    console.log("error bestOptionsPerYear", error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

//Remove coma price to compare prices
const removeComaPrice = (filteredQuotes) => {
  return filteredQuotes.map((quote) => {
    const array = quote.price.split(",");
    quote.price = array[0] + array[1];

    return quote;
  });
};

const getBestOptionByType = (quotes, year, type) => {
  const filtered = quotes.filter(
    (quote) =>
      quote.coverageType === type &&
      year >= quote.yearRange[0] &&
      year <= quote.yearRange[1]
  );
  console.log(type, filtered);

  let bestOption = null;

  for (quote of filtered) {
    if (!bestOption) {
      bestOption = quote;
    }
    if (Number(quote.price) < Number(bestOption.price)) {
      bestOption = quote;
    }
  }
  console.log("best", bestOption);
  return bestOption;
};

module.exports = controllers;
