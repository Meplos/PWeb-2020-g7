module.exports = class {
  constructor(repo) {
    this.repo = repo;
  }

  async addGameToWishlist(id, game) {
    await this.repo.addGameToWishlist(id, game);
    console.log(game);
    return 200;
  }

  async getAllGames(id) {
    const wishlist = await this.repo.getAllGames(id);
    return wishlist;
  }

  async deleteGame(id, gameList) {
    await this.repo.deleteGame(id, gameList);
    return 200;
  }
};
