const Rawg = require("../api/Rawg");
const Steam = require("../api/Steam");
const Gog = require("../api/Gog");
const GameInfo = require("../model/GameInfo");

module.exports = class {
  constructor() {}

  async buildRawgInfo(name) {
    const rawg = new Rawg();
    let gameInfo = null;
    let steamInfo = null;
    const rawResult = rawg.getGame(name);
    await rawResult
      .then((game) => {
        gameInfo = new GameInfo(
          game.id,
          game.name,
          game.slug,
          game.metacritic,
          game.background_image
        );
        gameInfo.setPlatforms(rawg.getGamePlatforms(game));
        steamInfo = rawg.getSteamInfo(game);
      })
      .catch((err) => {
        console.log(err);
      });
    return { gameInfo, steamInfo };
  }

  async buildSteamInfo(steamInfo, gameInfo) {
    const steam = new Steam();
    if (!steamInfo) return gameInfo;
    gameInfo.steamURL = steamInfo.steamGameURL;
    await steam
      .getAppInfo(steamInfo.steamGameId)
      .then((steamRes) => {
        const { currency, price } = steam.getAppPrice(steamRes);
        gameInfo.setCurrency(currency);
        gameInfo.setSteamPrice(price);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(gameInfo);
    return gameInfo;
  }

  async buildGogInfo(gameInfo) {
    const gog = new Gog();
    await gog
      .getOneGame(gameInfo.name)
      .then((gogResult) => {
        if (gogResult) {
          const price = gog.getPrice(gogResult);
          gameInfo.setGogPrice(price);
          gameInfo.gogURL = `https://gog.com/${gogResult.url}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return gameInfo;
  }
  async buildGameInfo(name) {
    let statusCode = 404;
    let gameInfo = null;
    let steamInfo = null;
    await this.buildRawgInfo(name).then((rawg) => {
      steamInfo = rawg.steamInfo;
      gameInfo = rawg.gameInfo;
    });
    if (gameInfo) statusCode = 200;
    else {
      return { statusCode, gameInfo };
    }
    await this.buildSteamInfo(steamInfo, gameInfo).then(
      (steamGameInfo) => (gameInfo = steamGameInfo)
    );

    await this.buildGogInfo(gameInfo).then(
      (gogGameInfo) => (gameInfo = gogGameInfo)
    );
    console.log(gameInfo);
    return { statusCode, gameInfo };
  }
};
