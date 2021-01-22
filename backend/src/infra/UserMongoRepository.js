const UserDAO = require("./DAO/UserMongoDAO");
const WishGameDAO = require("./DAO/WishGameDAO");
module.exports = class {
  constructor() {}

  async save(user) {
    user.wishlist = [];
    const newUser = new UserDAO(user);
    let isSaved = false;
    await newUser.save().then((res) => (isSaved = true));
    return isSaved;
  }

  async findOneByMail(mail) {
    let user;
    await UserDAO.findOne({ email: mail }).then((res) => {
      user = res;
    });
    console.log("findOneByMail");
    console.log(user);
    return user;
  }

  async findOneById(id) {
    let user;
    await UserDAO.findOne({ _id: id }).then((res) => {
      user = res;
    });
    console.log("findOneById");
    console.log(user);
    return user;
  }

  // WISHLIST

  async addGameToWishlist(userId, game) {
    const user = await this.findOneById(userId);
    user.wishlist.push(game);
    console.log(user);
    UserDAO.updateOne({ _id: user._id }, user).then((res) => {
      console.log(res);
    });
    //this.findOneById(user._id);
  }

  async getAllGames(userId) {
    console.log("++++ REPO GETALLGAMES +++");
    const user = await this.findOneById(userId);
    const wishlist = user.wishlist;
    console.log(wishlist);
    return wishlist;
  }

  async deleteGame(userId, gameName) {
    console.log("++++ REPO DELETE GAME +++");
    const user = await this.findOneById(userId);
    user.wishlist = user.wishlist.filter((game) => game.name !== gameName);
    UserDAO.updateOne({ _id: user._id }, user).then((res) => {
      console.log(res);
    });
  }
};
