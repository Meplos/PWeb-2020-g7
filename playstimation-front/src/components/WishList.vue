<template>
  <div class="WishList">
    <v-row>
      <h1>Wishlist</h1>
      <div v-if="wishlist.length <= 0">
        <v-alert class="error">Wishlist is empty</v-alert>
      </div>
    </v-row>
    <v-row v-for="(game, index) in wishlist" :key="index">
      <div>
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
