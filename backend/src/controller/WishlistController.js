//const GameInfo = require("../model/GameInfo");
const WishList = require("../model/WishList");

module.exports = class {
    constructor(wishlistRepo) {
        this.repo = wishlistRepo;
        const wishList = new WishList();
    }

    async addGameToWishlist(gameName, userName) {
        console.log("In addGameToWishlist() function");
        let isSaved = false;
        
        await this.repo.addGame(gameName, userName).then((res) => {
        console.log(res ? "Game added to wishlist" : "Error when adding game to wishlist");
        isSaved = res;
        })
        .catch((err) => {
            console.log(err);
          });

          await this.repo.findOneByMail(userName).then((res) => {
            console.log(res ? "Found Game" : "Error when founding game");
            isSaved = res;
            })
            .catch((err) => {
                console.log(err);
              });

        return isSaved;
    }



};