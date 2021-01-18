const GameInfo = require("../model/GameInfo");

module.exports = class {
    constructor() {
      this.gameInfo = [];
    }

    getList(){
        return this.gameInfo ;
    }

    addGame(_gameInfo)
   {
       this.gameInfo.push(_gameInfo);
   } 
};