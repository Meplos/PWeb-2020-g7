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
    console.log(reqUrl);
    let results = [];
    let game = {};
    await axios.get(reqUrl).then((res) => {
      if (res.status !== 200) throw "invalid name";
      if (res.data.totalResults === 0) return null;
      results = res.data.products;
      game = results.filter((curr) => curr.title === name)[0];
      if (!game) return null;
      console.log(game);
    });
    return game;
  }

  getPrice(game) {
    return eval(game.price.finalAmount);
  }
};
