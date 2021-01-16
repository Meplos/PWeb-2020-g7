const axios = require("axios");
var currencyFormatter = require("currency-formatter");

module.exports = class {
  constructor() {
    this.url = "https://store.steampowered.com/api/";
  }

  async getAppInfo(appId, userLanguage) {
    const reqUrl = `${this.url}appdetails?l=${userLanguage}&appids=${appId}`;
    console.log(reqUrl);
    let result = {};
    await axios.get(reqUrl).then((res) => {
      if (res.status !== 200) throw "Invalid steam id";
      result = res.data[appId].data;
    });
    return result;
  }

  getAppPrice(app) {
    console.log(app.price_overview.currency);
    const currency = currencyFormatter.findCurrency(app.price_overview.currency)
      .symbol;
    const price = app.price_overview.final / 100;
    return { currency, price };
  }
};
