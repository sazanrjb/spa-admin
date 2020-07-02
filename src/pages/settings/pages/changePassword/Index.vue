<template>
  <div>
    <page-heading>Change Password</page-heading>
    <v-card>
      <v-card-text>
        <v-overlay :value="loading" :absolute="true" opacity="0.2">
          <v-progress-circular indeterminate size="50"></v-progress-circular>
        </v-overlay>
        <v-container>
          <form @submit.prevent="submit" @keydown.enter.prevent="submit">
            <ValidationObserver ref="changePasswordForm">
              <v-row>
                <v-col cols="4">
                  <ValidationProvider v-slot="{ errors }" name="old_password" rules="required">
                    <v-text-field
                      v-model="model.old_password"
                      :error-messages="errors"
                      label="Old Password*"
                      type="password"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <ValidationProvider v-slot="{ errors }" name="new_password" rules="required">
                    <v-text-field
                      v-model="model.new_password"
                      :error-messages="errors"
                      label="New Password*"
                      type="password"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="confirm_password"
                    rules="required|confirmed:new_password"
                  >
                    <v-text-field
                      v-model="model.confirm_password"
                      :error-messages="errors"
                      label="Confirm Password*"
                      type="password"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" class="text-end">
                  <v-btn @click="submit" color="primary">Save</v-btn>
                </v-col>
              </v-row>
            </ValidationObserver>
          </form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PageHeading from "@/components/PageHeading.vue";
import { postChangePassword } from "../../api/calls";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import { required, confirmed } from "vee-validate/dist/rules";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required"
});

extend("confirmed", {
  ...confirmed,
  message: "{_field_} must match with New Password"
});

export default {
  name: "ChangePassword",
  components: {
    PageHeading,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      model: {},
      loading: false
    };
  },
  methods: {
    submit() {
      this.$refs.changePasswordForm
        .validate()
        .then(success => {
          if (!success) {
            return false;
          }

          this.loading = true;
          postChangePassword(this.model)
            .then(() => {
              this.$notify("Successfully changed the password");
              this.loading = false;
              this.model = {};
              this.$refs.changePasswordForm.reset();
            })
            .catch(({ response }) => {
              this.loading = false;
              if (response.status === 406) {
                this.$refs.changePasswordForm.setErrors(response.data.error);
                return false;
              }
              this.$notify(
                response.data.error || "Unable to change the password",
                "error"
              );
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>