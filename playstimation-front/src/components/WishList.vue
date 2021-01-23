<template>
  <div class="WishList">
    <v-row>
      <h1>Wishlist</h1>
      <div v-if="wishlist.length <= 0">
        <v-alert class="error">Wishlist is empty</v-alert>
      </div>
    </v-row>
    <v-btn fab class="error" @click="deleteGames">
      <v-icon>mdi-trash</v-icon>
    </v-btn>
    <v-row v-for="(game, index) in wishlist" :key="index">
      <div @click="addToDelete(game.name)">
        {{ game.name }}
      </div>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    wishlist: [],
    deleteList: [],
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
        });
    },
    addToDelete(name) {
      this.deleteList.push(name);
    },
    removeFromDelete(name) {
      this.deleteList = this.deleteList.filter((cur) => cur !== name);
    },
    deleteGames() {
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
        data: { list: this.deleteList },
        headers: headers,
      });
    },
  },

  mounted() {
    this.getWishList();
  },
};
</script>

<style>
.msg {
  font-weight: bold;
  justify-content: center;
  align-items: center;

  margin: 30px;
}
</style>
