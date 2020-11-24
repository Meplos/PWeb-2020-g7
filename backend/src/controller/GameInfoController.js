const Rawg = require("../api/Rawg");
const Steam = require("../api/Steam");
const Gog = require("../api/Gog");
const GameInfo = require("../model/GameInfo");

module.exports = class {
  constructor() {}

  async buildGameInfo(name) {
    let statusCode = 404;
    let gameInfo = null;
    let steamInfo = null;

    const rawg = new Rawg();
    const steam = new Steam();
    const gog = new Gog();
    const rawResult = rawg.getGame(name);

    await rawResult
      .then((game) => {
        gameInfo = new GameInfo(
          game.id,
          game.name,
          game.metacritic,
          game.background_image
        );
        gameInfo.setPlatforms(rawg.getGamePlatforms(game));
        steamInfo = rawg.getSteamInfo(game);
      })
      .catch((err) => {
        console.log(err);
      });

    if (!steamInfo) {
      statusCode = 400;
      return { statusCode, gameInfo };
    }
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

    await gog
      .getOneGame(gameInfo.name)
      .then((gogResult) => {
        const price = gogResult ? gog.getPrice(gogResult) : null;
        gameInfo.setGogPrice(price);
        statusCode = 200;
      })
      .catch((err) => {
        console.log(err);
      });

    return { statusCode, gameInfo };
  }
};
