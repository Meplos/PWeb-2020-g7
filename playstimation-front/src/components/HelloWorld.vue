<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="8 ma-16">
        <v-alert v-if="$store.state.token" class="success">
          You're are connected
          <v-icon @click="disconect()">mdi-power</v-icon>
        </v-alert>
        <v-alert v-else class="error">
          You're not connected! Please connect
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",

  data: () => ({}),
  methods: {
    disconect() {
      this.$store.commit("DECONNEXION");
    },
  },
  created() {
    console.log(this.$store.token);
    let headers = { token: null };
    if (this.$store.state.token) {
      headers = { token: this.$store.token };
    }
    axios
      .get(`${this.backendHost}/authTest`, {
        headers: headers,
      })
      .then(() => console.log("testAuth"));
  },
};
</script>
