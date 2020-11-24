const axios = require("axios");
var currencyFormatter = require("currency-formatter");

module.exports = class {
  constructor() {
    this.url = "https://embed.gog.com";
  }

  async getOneGame(name) {
    const reqUrl = `${
      this.url
    }/games/ajax/filtered?mediaType=game&search=${encodeURI(name)}`;
    let results = [];
    let game = null;
    await axios.get(reqUrl).then((res) => {
      if (res.status !== 200) throw "invalid name";
      if (res.data.totalResults > 0) {
        results = res.data.products;
        game = results.filter((curr) => curr.title === name)[0];
      }
    });
    return game;
  }

  getPrice(game) {
    return eval(game.price.finalAmount);
  }
};
