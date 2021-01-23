<template>
  <v-app-bar app color="primary" dark class="navbar">
    <v-container class="py-0 fill-height">
      <v-row>
        <v-img
          :src="require('../assets/gamepad.png')"
          class="md-2 mr-2"
          max-height="40"
          max-width="40"
          contain
          @click="$router.push({ name: 'Home' })"
        />
        <h1 class="appName" @click="$router.push({ name: 'Home' })">
          {{ $appName }}
        </h1>
        <v-responsive max-width="400" class="ml-16">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            placeholder="Type game name ..."
            v-model="gameName"
            append-icon="mdi-magnify"
            @keyup.enter="search()"
          ></v-text-field>
        </v-responsive>
        <v-btn
          class="success ml-4"
          justify="end"
          v-if="!$store.state.token"
          @click="$router.push({ name: 'LogIn' })"
        >
          Log In
        </v-btn>
        <v-btn v-else text @click="$router.push({ name: 'Wishlist' })">
          <v-icon>mdi-shopping-outline</v-icon>
        </v-btn>
        <v-btn
          class="ml-4"
          text
          justify="end"
          v-if="!$store.state.token"
          @click="$router.push({ name: 'SignUp' })"
        >
          Create account
        </v-btn>
        <v-btn
          v-else
          text
          @click="$store.commit('DECONNEXION'), $router.push({ name: 'Home' })"
        >
          <v-icon>mdi-power</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    gameName: "",
  }),
  methods: {
    search() {
      const gameEncoded = encodeURI(this.gameName);
      this.$router.push({ name: "Search", params: { game: gameEncoded } });
    },
  },
};
</script>

<style>
.navbar {
  align-items: center;
}
</style>
