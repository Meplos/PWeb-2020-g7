const axios = require("axios");
var currencyFormatter = require("currency-formatter");

module.exports = class {
  constructor() {
    this.url = "https://embed.gog.com";
  }

  async getOneGame(name) {
    const reqUrl = `${
      this.url
    }/games/ajax/filtered?mediaType=game&search=${encodeURI(name)}&limit=1`;
    console.log(reqUrl);
    let result = {};
    await axios.get(reqUrl).then((res) => {
      if (res.status !== 200) throw "invalid name";
      if (res.data.totalResults === 0) return null;
      result = res.data.products[0];
    });
    return result;
  }

  getPrice(game) {
    return eval(game.price.finalAmount);
  }
};
