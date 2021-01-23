module.exports = class {
  constructor(id, name, slug, metascore, img) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.metascore = metascore;
    this.img = img;
    this.platforms = [];
    this.currency = "€";
    this.steamPrice = null;
    this.steamURL = null;
    this.gogPrice = null;
    this.gogURL = null;
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
