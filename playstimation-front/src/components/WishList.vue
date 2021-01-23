<template>
  <div class="WishList">
    <h1>Wishlist</h1>
    <div v-if="$store.state.wishlist.length <= 0">
      <v-alert class="error">Wishlist is empty</v-alert>
    </div>
    <div v-else>
      <v-btn icon class="error" @click="deleteGames">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
      <v-checkbox
        label="Select All"
        v-model="selectAll"
        @change="checkList = checkList.map((cur) => selectAll)"
      ></v-checkbox>
    </div>

    <div
      class="wishGameInfo"
      v-for="(game, index) in $store.state.wishlist"
      :key="index"
      :class="!checkList[index] ? 'secondary' : 'error'"
    >
      <v-row>
        <v-col cols="2">
          <v-img :src="game.image" class="game__img ml-2"></v-img>
        </v-col>
        <v-col cols="4" class="align-self-center">
          <h2>{{ game.name }}</h2>
        </v-col>
        <v-col cols="1" class="align-self-center">
          <v-checkbox v-model="checkList[index]"></v-checkbox>
        </v-col>
        <v-col cols="4" class="align-self-center">
          <div class="gameInfo__headerPlatform">
            <v-img
              v-for="(platform, index) in game.platforms"
              :key="index"
              class="md-2 mr-6"
              :src="require(`../assets/${platform}.png`)"
              max-height="45"
              max-width="45"
            />
          </div>
        </v-col>
        <v-col cols="1" class="align-self-center">
          <v-btn
            icon
            @click="
              $router.push({ name: 'Search', params: { game: game.slug } })
            "
          >
            <v-icon>
              mdi-share
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    checkList: [],
    selectAll: false,
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
    deleteGames() {
      const deleteList = [];
      for (let index = 0; index < this.$store.state.wishlist.length; index++) {
        if (this.checkList[index])
          deleteList.push(this.$store.state.wishlist[index].name);
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
      axios
        .delete(`${this.$backendHost}/wishlist/`, {
          data: { list: deleteList },
          headers: headers,
        })
        .then(() => {
          this.$store
            .dispatch("refreshWishlist")
            .then(() => this.setCheckList());
        });
    },

    setCheckList() {
      this.$store.state.wishlist.forEach(() => {
        this.checkList.push(false);
      });
    },
  },

  mounted() {
    if (!this.$store.state.token) {
      this.$router.push({ name: "Home" });
    }
    this.$store.dispatch("refreshWishlist").then(() => this.setCheckList());
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

.wishGameInfo {
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
