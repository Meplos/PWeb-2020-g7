<template>
  <div class="WishList">
    <h1>Wishlist</h1>
    <div v-if="wishlist.length <= 0">
      <v-alert class="error">Wishlist is empty</v-alert>
    </div>
    <div v-else>
      <v-btn fab class="error" @click="deleteGames">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </div>

    <div class="gameInfo success">
      <a v-for="(game, index) in wishlist" :key="index">
        <v-row>
          <v-col cols="2">
            <v-img :src="game.image" class="game__img ml-2"></v-img>
          </v-col>
          <v-col cols="7" class="align-self-center">
            <h2>{{ game.name }}</h2>
          </v-col>
          <v-col cols="1" class="align-self-center">
            <v-checkbox v-model="checkList[index]"></v-checkbox>
          </v-col>
        </v-row>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    wishlist: [],
    checkList: [],
  }),
  methods: {
    getWishList() {
      console.log(this.$store.token);
      let headers = {
        token: null,
        lang: navigator.language,
      };
      if (this.$store.state.token) {
        headers.token = this.$store.state.token;
      }
      console.log(headers);
      axios
        .get(`${this.$backendHost}/wishlist/`, {
          headers: headers,
        })
        .then((res) => {
          this.wishlist = res.data.wishlist;
          this.wishlist.forEach(() => {
            this.checkList.push(false);
          });
        });
    },
    addToDelete(name) {
      this.deleteList.push(name);
    },
    removeFromDelete(name) {
      this.deleteList = this.deleteList.filter((cur) => cur !== name);
    },
    deleteGames() {
      const deleteList = [];
      for (let index = 0; index < this.wishlist.length; index++) {
        if (this.checkList[index]) deleteList.push(this.wishlist[index].name);
      }
      console.log(this.$store.state.token);
      let headers = {
        token: null,
        lang: navigator.language,
      };
      if (this.$store.state.token) {
        headers.token = this.$store.state.token;
      }
      console.log(headers);
      axios.delete(`${this.$backendHost}/wishlist/`, {
        data: { list: deleteList },
        headers: headers,
      });
    },
  },

  mounted() {
    if (!this.$store.state.token) {
      this.$router.push({ name: "Home" });
    }
    this.getWishList();
  },
};
</script>

<style>
.game__img {
  width: 100px;
  height: 150px;

  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
}

.gameInfo {
  margin-top: 30px;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  align-items: center;
  opacity: 0.8;
  transition: 0.3s;
}
.msg {
  font-weight: bold;
  justify-content: center;
  align-items: center;

  margin: 30px;
}
</style>
