//const GameInfo = require("../model/GameInfo");
//const WishList = require("../model/WishList");

module.exports = class {
    constructor(wishlistRepo) {
        this.repo = wishlistRepo;
        const wishList = new WishList();
    }

    async addGameToWishlist(gameName, userName) {
        let isSaved = false;
        await this.repo.addGame(gameName, userName).then((res) => {
        console.log(res ? "Game added to wishlist" : "Error when adding game to wishlist");
        isSaved = res;
        });
        return isSaved;
    }

};