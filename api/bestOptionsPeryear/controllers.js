const {
  readJsonFile,
  removeComaPrice,
} = require("../../services/utils/functions");

let controllers = {};

controllers.bestOptionsPerYear = async (req, res) => {
  try {
    const year = Number(req.params.year);
    console.log(year);
    // get quotes from json
    let quotes = readJsonFile();
    quotes = removeComaPrice(quotes);

    //compare and get best option per coverage type
    const bestOptionRC = getBestOptionByType(quotes, year, "RC");
    const bestOptionLow = getBestOptionByType(quotes, year, "Low");
    const bestOptionMid = getBestOptionByType(quotes, year, "Mid");
    const bestOptionHigh = getBestOptionByType(quotes, year, "High");

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

const getBestOptionByType = (quotes, year, type) => {
  const filtered = quotes.filter(
    (quote) =>
      quote.coverageType === type &&
      year >= quote.yearRange[0] &&
      year <= quote.yearRange[1]
  );

  let bestOption = null;
  if (filtered.length === 0) return {};

  for (quote of filtered) {
    if (!bestOption) {
      bestOption = quote;
    }
    if (Number(quote.price) < Number(bestOption.price)) {
      bestOption = quote;
    }
  }

  return bestOption;
};

module.exports = controllers;
