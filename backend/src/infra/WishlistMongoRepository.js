const WishlistDAO = require("./DAO/WishlistMongoDAO");
module.exports = class {
  constructor() {}

  /*async save(user) {
    const newWL = new WishlistDAO({user: user, wishlist: []});
    let isSaved = false;
    await newWL.save().then((res) => (isSaved = true));
    return isSaved;
  }*/

  async addGame(game, email) {
    let isSaved = false;
    await WishlistDAO.findOneAndUpdate(
      { "user" : email },
      { $push: { "wishlist" : game } },
      { returnNewDocument: true }
   ).then((res) => {
    isSaved = res;
    console.log(res);
  });
    return (isSaved !== null);
  }

  /*async findOneByMail(mail) {
    let user;
    await UserDAO.findOne({ email: mail }).then((res) => {
      user = res;
    });
    return user;
  }*/
};
