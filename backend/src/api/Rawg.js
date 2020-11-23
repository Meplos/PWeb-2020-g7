const axios = require("axios");
module.exports = class {
  constructor() {
    this.url = "https://rawg.io/api";
  }

  async getGame(name) {
    const slug = this.getSlug(name);
    let result = "";
    await axios.get(`${this.url}/games/${slug}`).then((res) => {
      if (res.status !== 200) throw "Invalid name";
      const data = res.data;
      if (data.redirect) {
        result = this.getGame(data.slug);
      } else {
        result = data;
      }
    });
    return result;
  }

  getSlug(name) {
    return name.toLowerCase().replace(/ /g, "-");
  }

  getGamePlatforms(game) {
    const platformsDetails = game.parent_platforms;
    const platforms = [];
    platformsDetails.forEach((curr) => platforms.push(curr.platform.slug));
    return platforms;
  }

  getSteamInfo(game) {
    const steam = game.stores.filter((curr) => curr.store.slug === "steam")[0];
    //http://store.steampowered.com/app/620/
    //"https://store.steampowered.com/app/292030/the_witcher_3_wild_hunt/
    if (!steam) return null;
    const steamGameURL = steam.url;
    const steamGameId = steamGameURL.split("/")[4];
    return { steamGameURL, steamGameId };
  }
};
