<template>
  <div class="WishList">
    <v-row>
      <v-col cols="9" class="msg">
        <v-alert class="success" outlined>
          This is your WishList
        </v-alert>
        <div class="gameInfo__shopList">
        <a
          v-for="game in getWishList()"
          :key="game.game"
          :href="game.url"
        >
          <p class="test_game">
              This game is on your wishlist {{ game.name }}
          </p>
        </a>
      </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    id: null,
    name: "",
    slug: "",
    platforms: [],
    img: "https://placehold.it/170x200",
  }),
  methods: {
    getWishList() {
      console.log(this.$store.token);
      let headers = {
        token: null,
        lang: navigator.language,
      };
      if (this.$store.state.token) {
        headers.token = this.$store.token;
      }
      console.log(headers);
      axios
        .get(`${this.$backendHost}/wishlist/`, {
          headers: headers,
        })
        return [
          {
            name: "gog",
            price: this.gogPrice,
            color: "success",
            url: this.gogURL,
          },
          {
            name: "steam",
            price: this.steamPrice,
            color: "warning",
            url: this.steamURL,
          },
        ];
    }
      
  }
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
