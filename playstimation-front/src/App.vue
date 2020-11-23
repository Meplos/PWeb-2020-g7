<template>
  <div id="app">
    <v-app
      style="
    background: #3D3D3D;"
    >
      <Navbar />
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="css">
.app {
  height: 100%;
}
</style>
