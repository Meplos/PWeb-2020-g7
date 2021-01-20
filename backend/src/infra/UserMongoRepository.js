const UserDAO = require("./DAO/UserMongoDAO");
const WishlistDAO = require("./DAO/WishlistMongoDAO");
module.exports = class {
  constructor() {}

  async save(user) {
    const newUser = new UserDAO(user);
    let isSaved = false;
    await newUser.save().then((res) => (isSaved = true));
    const newWL = new WishlistDAO({user: user.email, wishlist:[]});
    //await newWL.save().then((res) => (isSaved = true));
    console.log("ICIIIIIIIIIIII");
    console.log(newWL);
    console.log(isSaved);
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
    let mail;
    await UserDAO.findOne({ _id: id }).then((res) => {
      mail = res.email;
    });
    console.log("findOneById");
    console.log(mail);
    return mail;
  }
};

