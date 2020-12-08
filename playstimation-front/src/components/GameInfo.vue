<template>
  <div class="gameInfo">
    <div class="gameInfo__header">
      <v-row>
        <v-col cols="1">
          <v-img :src="img" class="game__img"></v-img>
        </v-col>
        <v-col cols="10">
          <h1>{{ name }}</h1>
          <div class="gameInfo__headerPlatform">
            <v-img
              v-for="(platform, index) in platforms"
              :key="index"
              class="md-2 mr-6"
              :src="require(`../assets/${platform}.png`)"
              max-height="45"
              max-width="45"
            />
          </div>
        </v-col>
        <v-col cols="1">
          <div class="gameInfo__headerMetascore" :class="getScoreColor">
            {{ metascore }}
          </div>
        </v-col>
      </v-row>
      <div class="gameInfo__shopList">
        <a
          v-for="shop in getShopOrderByPrices()"
          :key="shop.shop"
          :href="shop.url"
        >
          <v-row
            class="gameInfo__shop"
            :class="shop.price ? shop.color : 'error'"
          >
            <v-col cols="10">
              <v-img
                :src="require(`../assets/${shop.name}.png`)"
                max-height="70"
                max-width="70"
              ></v-img>
            </v-col>
            <v-col cols="2">
              <p class="shop__price" v-if="shop.price">
                {{ currency }}{{ shop.price }}
              </p>
              <p class="shop__price" v-else>
                Game not available on {{ shop.name }}
              </p>
            </v-col>
          </v-row>
        </a>
      </div>
    </div>
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
    isWish: false,
    metascore: null,
    currency: "",
    steamPrice: null,
    steamURL: null,
    gogPrice: null,
    gogURL: null,
  }),
  methods: {
    getShopOrderByPrices() {
      if (this.steamPrice && this.steamPrice < this.gogPrice) {
        return [
          {
            name: "steam",
            price: this.steamPrice,
            color: "success",
            url: this.steamURL,
          },
          {
            name: "gog",
            price: this.gogPrice,
            color: "warning",
            url: this.steamURL,
          },
        ];
      } else if (this.gogPrice && this.gogPrice < this.steamPrice) {
        console.log("Wait what");
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
      } else {
        return [
          {
            name: "steam",
            price: this.steamPrice,
            color: "success",
            url: this.steamURL,
          },
          {
            name: "gog",
            price: this.gogPrice,
            color: "success",
            url: this.gogURL,
          },
        ];
      }
    },

    getGame() {
      console.log(this.$store.token);
      let headers = { token: null };
      if (this.$store.state.token) {
        headers = { token: this.$store.token };
      }
      axios
        .get(`${this.$backendHost}/game/${this.$route.params.game}`, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          this.name = res.data.name;
          this.slug = res.data.slug;
          this.platforms = res.data.platforms;
          this.img = res.data.img;
          this.isWish = res.data.isWish;
          this.metascore = res.data.metascore;
          this.currency = res.data.currency;
          this.steamPrice = res.data.steamPrice;
          this.steamURL = res.data.steamURL;
          this.gogPrice = res.data.gogPrice;
          this.gogURL = res.data.gogURL;
        })
        .catch(() => {
          this.$router.push({ name: "NotFound" });
        });
    },
  },
  computed: {
    getScoreColor: function() {
      if (this.metascore > 80) return "success";
      if (this.metascore > 50) return "warning";
      return "error";
    },
  },
  watch: {
    "$route.params.game"(newId, oldId) {
      if (newId !== oldId) {
        this.getGame(newId);
      }
    },
  },
  mounted() {
    this.getGame();
  },
};
</script>

<style>
a {
  color: white !important;
  text-decoration: none !important;
}
.game__img {
  width: 170px;
  height: 200px;

  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
}

.gameInfo__headerPlatform {
  display: flex;
  margin-top: 10px;
}

.gameInfo__headerMetascore {
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-family: "Roboto";

  border-radius: 10px;
}

.gameInfo__shop {
  margin-top: 30px;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  align-items: center;
  opacity: 0.8;
  transition: 0.3s;
}

.gameInfo__shop:hover {
  opacity: 1;
}

.shop__price {
  font-size: 32px;
}
</style>
