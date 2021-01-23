<template>
  <div class="login__container">
    <v-layout class="login__header" justify-center>
      <v-img
        :src="require('../assets/gamepad.png')"
        class="md-2 mr-2 mt-4"
        max-height="100"
        max-width="100"
        contain
      />
      <h1>{{ $appName }}</h1>
    </v-layout>
    <v-form ref="form" v-model="valid" lazy-validation class="mt-16">
      <v-row>
        <v-layout justify-center="">
          <v-col cols="4">
            <v-text-field
              filled
              label="Email"
              placeholder="Jean@wanadoo.fr"
              required
              :rules="[rules.email]"
              v-model="email"
            />
          </v-col>
        </v-layout>
      </v-row>
      <v-row>
        <v-layout justify-center>
          <v-col cols="4">
            <v-text-field
              autocomplete="current-password"
              :value="pwd"
              label="Password"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              :rules="[rules.password]"
              @input="(_) => (pwd = _)"
              filled
              required
            />
          </v-col>
        </v-layout>
      </v-row>
      <v-row>
        <v-layout justify-center>
          <v-col cols="2">
            <v-btn class="primary pt-6 pb-6" @click="submit" :disabled="!valid">
              {{ isSignInPage ? signInText : createAccountText }}
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn outlined class="pt-6 pb-6" @click="SideButtonRedirection()">
              {{ isSignInPage ? createAccountText : signInText }}
            </v-btn>
            <div class="error msg">{{ error }}</div>
          </v-col>
        </v-layout>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import bcrypt from "bcryptjs";

export default {
  props: {
    isSignInPage: Boolean,
  },
  data() {
    return {
      email: "",
      pwd: "",
      valid: true,
      value: true,
      rules: {
        required: (v) => !!v || "Required",
        password: (v) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          return (
            pattern.test(v) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        },
        email: (v) => /.+@.+/.test(v) || "E-mail must be valid",
      },
      error: "",

      signInText: "SIGN IN",
      createAccountText: "CREATE ACCOUNT",
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const user = { email: this.email, password: this.pwd };
        console.log(user);

        console.log("form is valid");
        if (this.isSignInPage) {
          console.log("signIn");
          this.signin(user);
        } else {
          console.log("Create Account");
          this.signup(user);
        }
      }
    },
    hash(password) {
      const SALT_ITERATION = 10;
      console.log(password);
      const salt = bcrypt.genSaltSync(SALT_ITERATION);
      return bcrypt.hashSync(password, salt);
    },
    signup(user) {
      console.log("Signing up");
      axios.post(`${this.$backendHost}/signup`, user).then((res) => {
        console.log(res);
      });
    },
    signin(user) {
      axios.post(`${this.$backendHost}/login`, user).then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.token);
          console.log(res.data.refreshToken);
          this.$store.commit("CONNEXION", res.data.token);
          this.$store.commit("SET_REFRESH", res.data.refreshToken);
          this.$store.dispatch("refreshToken");
          this.$store.dispatch("refreshWishlist");
          this.$router.push({ name: "Home" });
        } else {
          this.error = res.data.error;
        }
      });
    },
    SideButtonRedirection() {
      if (this.isSignInPage) this.$router.push({ name: "SignUp" });
      else this.$router.push({ name: "LogIn" });
    },
  },
};
</script>

<style>
.login__header {
  font-size: 45px;
}
</style>
