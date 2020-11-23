<template>
  <div class="NotFound">
    <v-row>
      <v-col cols="9" class="msg">
        <v-alert class="error " outlined>
          The game you searched for has not been found
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.msg {
  font-weight: bold;
  justify-content: center;
  align-items: center;

  margin: 30px;
}
</style>
