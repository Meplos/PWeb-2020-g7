const express = require("express");
const bodyParser = require("body-parser");
const Rawg = require("./api/Rawg");
const Steam = require("./api/Steam");
const Gog = require("./api/Gog");
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/game/:gameName", (req, res) => {
  // TODO Refactor
  const name = req.params.gameName;
  const rawg = new Rawg();
  const steam = new Steam();
  const gog = new Gog();
  const rawResult = rawg.getGame(name);
  const gameInfo = {};
  rawResult
    .then((game) => {
      gameInfo.id = game.id;
      gameInfo.name = game.name;
      gameInfo.metascore = game.metacritic;
      gameInfo.img = game.background_image;
      gameInfo.platforms = rawg.getGamePlatforms(game);
      const steamInfo = rawg.getSteamInfo(game);
      if (!steamInfo) res.sendStatus(400);
      steam
        .getAppInfo(steamInfo.steamGameId)
        .then((steamRes) => {
          const { currency, price } = steam.getAppPrice(steamRes);
          gameInfo.currency = currency;
          gameInfo.steamPrice = price;
          console.log(gameInfo);
          gog
            .getOneGame(gameInfo.name)
            .then((gogResult) => {
              const gogPrice = gogResult ? gog.getPrice(gogResult) : null;
              gameInfo.gogPrice = gogPrice;
              console.log(gameInfo);
              res.status(200).send(gameInfo);
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(404);
            });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(404);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

app.listen(PORT, () => {
  console.log("Server listening...");
  console.log(`local : http://localhost:${PORT}`);
});
