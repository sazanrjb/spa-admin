<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-10">
              <v-overlay :value="loading" :absolute="true" opacity="0.2">
                <v-progress-circular indeterminate size="50"></v-progress-circular>
              </v-overlay>
              <v-toolbar dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <ValidationObserver ref="loginForm">
                <form @submit.prevent="login">
                  <v-card-text>
                    <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                      <v-text-field
                        v-model="credentials.email"
                        label="Email"
                        prepend-icon="mdi-account"
                        :error-messages="errors"
                        data-vv-name="email"
                        required
                      />
                    </ValidationProvider>

                    <ValidationProvider v-slot="{ errors }" name="Password" rules="required|min:5">
                      <v-text-field
                        v-model="credentials.password"
                        label="Password"
                        prepend-icon="mdi-lock"
                        type="password"
                        :error-messages="errors"
                        required
                      />
                    </ValidationProvider>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="login">Login</v-btn>
                  </v-card-actions>
                </form>
              </ValidationObserver>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Auth from "@/services/Auth";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required"
});
extend("email", {
  ...email,
  message: "{_field_} must be a valid email"
});
extend("min", {
  ...min,
  message: "{_field_} may not be greater than {length} characters"
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      loading: false,
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.loading = true;
        Auth.attempt(this.credentials).then(data => {
          this.loading = false;
          if (!data) {
            return;
          }

          // set data

          this.$router.push({ name: "Dashboard" });
        });
      });
    }
  }
};
</script>