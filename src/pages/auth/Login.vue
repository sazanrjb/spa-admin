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
                <v-toolbar-title>
                  <template v-if="!token">Login</template>
                  <template v-else>Enter OTP</template>
                </v-toolbar-title>
              </v-toolbar>
              <ValidationObserver ref="loginForm" v-if="!token">
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
              <ValidationObserver ref="otpForm" v-else>
                <form @submit.prevent="verifyOtp">
                  <v-card-text>
                    <ValidationProvider v-slot="{ errors }" name="OTP" rules="required|numeric">
                      <v-text-field
                        v-model="otp"
                        label="OTP"
                        prepend-icon="mdi-lock"
                        :error-messages="errors"
                        data-vv-name="otp"
                        required
                      />
                    </ValidationProvider>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="default" @click.prevent="resendOtp">Resend OTP</v-btn>
                    <v-btn color="primary" @click.prevent="verifyOtp">Submit</v-btn>
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
import { required, email, min, numeric } from "vee-validate/dist/rules";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required"
});
extend("email", {
  ...email,
  message: "{_field_} must be a valid email"
});
extend("numeric", {
  ...numeric,
  message: "{_field_} must be a numeric"
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
      },
      token: null,
      otp: null,
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.loading = true;
        Auth.attempt(this.credentials).then(token => {
          if (!token) {
            return;
          }

          this.token = token;
          this.$nextTick(() => this.$refs.otpForm.reset());
          this.$notify('An OTP has been sent to your email');
        })
        .catch(error => {
            this.$notify(
              (error.response.data && error.response.data.error) ||
                "Invalid email or password",
              "error"
            );
          })
        .finally(() => {
          this.loading = false;
        });
      });
    },
    verifyOtp() {
      this.$refs.otpForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.loading = true;
        Auth.verifyOtp(this.token, { otp: this.otp })
        .then((data) => {
          if (!data) {
            return;
          }

          this.$router.push({ name: 'Dashboard' });
        })
        .catch((error) => {
            this.$notify(
              (error.response.data && error.response.data.error) ||
                "Invalid OTP",
              "error"
            );
          })
        .finally(() => {
          this.loading = false;
        });
      });
    },
    resendOtp() {
      this.loading = true;
      return Auth.resendOtp(this.token)
        .then(({ status }) => {
          this.loading = false;
          this.$notify(status);
        })
        .catch(({ response }) => {
          this.$notify(response.data.error || "Unable to resend OTP", 'error');
          this.loading = false;
        });
    },
  }
};
</script>