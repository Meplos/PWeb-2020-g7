module.exports = class {
  constructor(id, name, metascore, img) {
    this.id = id;
    this.name = name;
    this.metascore = metascore;
    this.img = img;
    this.platforms = [];
    this.currency = "€";
    this.steamPrice = null;
    this.gogPrice = null;
  }

  setPlatforms(platforms) {
    this.platforms = platforms;
  }

  setCurrency(currency) {
    this.currency = currency;
  }
  setSteamPrice(price) {
    this.steamPrice = price;
  }

  setGogPrice(price) {
    this.gogPrice = price;
  }
};
