const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class {
  constructor(userRepo) {
    this.repo = userRepo;
    this.SECRET = "secret";
    this.SALT_ITERATION = 10;
  }

  async signin(user) {
    let token = null;
    await this.repo.findOneByMail(user.email).then((res) => {
      if (bcrypt.compareSync(user.password, res.password)) {
        console.log(res);
        console.log("Same Hash");
        token = jwt.sign({ userId: res._id }, this.SECRET);
      }
    });

    return token;
  }

  async signup(user) {
    user.password = bcrypt.hashSync(user.password, this.SALT_ITERATION);
    let isSaved = false;
    await this.repo.save(user).then((res) => {
      console.log(res ? "Account created" : "Error when creating account");
      isSaved = res;
    });
    return isSaved;
  }

  getUserIdByToken(token) {
    return jwt.verify(token, this.SECRET).userId;
  }
};
