const GameInfo = require("../model/GameInfo");

module.exports = class {
    constructor() {
      this.gameInfo = [];
    }

    getList(){
        return this.gameInfo ;
    }

    addGameModel(_gameInfo)
   {
       this.gameInfo.push(_gameInfo);
   } 
};