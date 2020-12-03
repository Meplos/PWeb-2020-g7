const UserDAO = require("./DAO/UserMongoDAO");
module.exports = class {
  constructor() {}

  async save(user) {
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
    return user;
  }
};
