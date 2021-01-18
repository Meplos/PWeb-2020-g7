const WishlistDAO = require("./DAO/WishlistMongoDAO");
module.exports = class {
  constructor() {}

  async save(user) {
    const newWL = new WishlistDAO({user: user, wishlist: []});
    let isSaved = false;
    await newWL.save().then((res) => (isSaved = true));
    return isSaved;
  }

  async addGame(game, email) {
    let wishlist;
    await WishlistDAO.findOne({ email: email }).then((res) => {
      wishlist = res;
    });
    //const newWL = rechercher la WishlistDAO(wl) du user;
    let isSaved = false;
    //await wishlist.
    //.save().then((res) => (isSaved = true));
    //append le jeu à sa liste
    return isSaved;
  }

  /*async findOneByMail(mail) {
    let user;
    await UserDAO.findOne({ email: mail }).then((res) => {
      user = res;
    });
    return user;
  }*/
};
