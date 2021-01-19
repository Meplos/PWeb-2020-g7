const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class {
  constructor(userRepo) {
    this.repo = userRepo;
    this.SECRET = "secret";
    this.REFRESH = "REFRESH";
    this.SALT_ITERATION = 10;
  }

  async signin(user) {
    let token = null;
    let refreshToken = null;
    await this.repo.findOneByMail(user.email).then((res) => {
      if (bcrypt.compareSync(user.password, res.password)) {
        console.log(res);
        console.log("Same Hash");
        token = jwt.sign({ userId: res._id }, this.SECRET, { expiresIn: "1h" });
        refreshToken = jwt.sign({ userId: res._id }, this.REFRESH);
      }
    });

    return { token, refreshToken };
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

  getRefreshToken(refreshToken) {
    const userId = this.checkRefreshToken(refreshToken).userId;
    if (userId) {
      return jwt.sign({ userId: userId }, this.SECRET, { expiresIn: "10s" });
    }
    return null;
  }
  checkRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, this.REFRESH);
  }
  getUserIdByToken(token) {
    return jwt.verify(token, this.SECRET).userId;
  }
};
