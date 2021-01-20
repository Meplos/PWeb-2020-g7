const WishlistDAO = require("./DAO/WishlistMongoDAO");
const UserDAO = require("./DAO/UserMongoDAO");
module.exports = class {
  constructor() {}

  /*async save(user) {
    const newWL = new WishlistDAO({user: user, wishlist: []});
    let isSaved = false;
    await newWL.save().then((res) => (isSaved = true));
    return isSaved;
  }*/

  async addGame(game, email) {
    //const newWL = new WishlistDAO({user: email, wishlist:[]});
    let isSaved = false;
    console.log(email);
    isSaved = await WishlistDAO.updateOne(
      { "_id" : email },
      { $push: { "wishlist" : game } },
      { returnNewDocument: true },
   )
    return (isSaved !== null);
  }

  async findOneByMail(userID) {
    let wish;
    console.log("findOne");
    console.log(userID);
    await WishlistDAO.findOne({ _id: userID }).then((res) => {
      wish = res;
      console.log(res);
    });
    
    return wish;
  }


  /*async findOneByMail(mail) {
    let user;
    await UserDAO.findOne({ email: mail }).then((res) => {
      user = res;
    });
    return user;
  }*/
};
