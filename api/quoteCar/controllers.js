const {
  readJsonFile,
  removeComaPrice,
} = require("../../services/utils/functions");

let controllers = {};

controllers.quoteCar = async (req, res) => {
  try {
    const { brand, year, hasAC } = req.query;
    // get quotes from json
    let quotes = readJsonFile();
    quotes = removeComaPrice(quotes);

    //compare and get best option per coverage type and extraCoveragePrice
    const bestOptionRC = getBestOptionByType(quotes, brand, year, "RC", hasAC);
    const bestOptionLow = getBestOptionByType(
      quotes,
      brand,
      year,
      "Low",
      hasAC
    );
    const bestOptionMid = getBestOptionByType(
      quotes,
      brand,
      year,
      "Mid",
      hasAC
    );
    const bestOptionHigh = getBestOptionByType(
      quotes,
      brand,
      year,
      "High",
      hasAC
    );

    let bestOptions = [
      bestOptionRC,
      bestOptionLow,
      bestOptionMid,
      bestOptionHigh,
    ];

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

const getBestOptionByType = (quotes, brand, year, type, hasAC) => {
  const filtered = quotes.filter(
    (quote) =>
      quote.brand === brand &&
      year >= quote.yearRange[0] &&
      year <= quote.yearRange[1] &&
      quote.coverageType === type
  );
  console.log(type, filtered);

  let bestOption = null;
  if (filtered.length === 0) return {};

  for (quote of filtered) {
    let totalPrice = 0;
    hasAC
      ? (totalPrice = Number(quote.price) + Number(quote.extraCoveragePrice))
      : (totalPrice = Number(quote.price));

    quote.totalPrice = totalPrice;
    if (!bestOption) {
      bestOption = quote;
    }
    if (quote.totalPrice < bestOption.totalPrice) {
      bestOption = quote;
    }
  }
  console.log("best", bestOption);
  delete quote.totalPrice;
  return bestOption;
};

module.exports = controllers;
