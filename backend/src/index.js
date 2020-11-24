const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const GameInfoController = require("./controller/GameInfoController");
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/game/:gameName", (req, res) => {
  const name = req.params.gameName;
  const gameInfoController = new GameInfoController();
  gameInfoController.buildGameInfo(name).then((result) => {
    if (result.statusCode === 200) {
      res.status(result.statusCode).send(result.gameInfo);
    } else {
      res.sendStatus(result.statusCode);
    }
  });
});

app.listen(PORT, () => {
  console.log("Server listening...");
  console.log(`local : http://localhost:${PORT}`);
});
