const axios = require("axios");
var currencyFormatter = require("currency-formatter");

module.exports = class {
  constructor() {
    this.url = "https://store.steampowered.com/api/";
  }

  async getAppInfo(appId) {
    const reqUrl = `${this.url}appdetails?appids=${appId}`;
    console.log(reqUrl);
    let result = {};
    await axios.get(reqUrl).then((res) => {
      if (res.status !== 200) throw "Invalid steam id";
      result = res.data[appId].data;
    });
    return result;
  }

  getAppPrice(app) {
    const currency = currencyFormatter.findCurrency(app.price_overview.currency)
      .symbol;
    const price = app.price_overview.final;
    return { currency, price };
  }
};
