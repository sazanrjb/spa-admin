<template>
  <div>
    <page-heading>
        <template v-if="isEdit">Edit </template> 
        <template v-else>Add </template> Ticket
        <template slot="actions">
        <div class="text-end">
          <v-btn icon outlined color="primary" title="Back to Tickets" @click="back">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </div>
      </template>   
    </page-heading>
    <v-card>
      <v-card-text>
        <v-overlay :value="loading" :absolute="true" opacity="0.2">
          <v-progress-circular indeterminate size="50"></v-progress-circular>
        </v-overlay>
        <v-container>
          <form @submit.prevent="submit" @keydown.enter.prevent="submit">
            <ValidationObserver ref="ticketForm">
                <v-row>
                    <v-col cols="6">
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="service_type"
                            rules="required"
                        >
                            <v-text-field
                            v-model="model.service_type"
                            :error-messages="errors"
                            label="Service Type*"
                            type="text"
                            ></v-text-field>
                        </ValidationProvider>
                    </v-col>
                    <v-col cols="6">
                        <ValidationProvider v-slot="{ errors }" name="name" :rules="requiredValidationRule">
                            <v-text-field
                            v-model="model.name"
                            :error-messages="errors"
                            :label="`Name${requiredSign}`"
                            type="text"
                            ></v-text-field>
                        </ValidationProvider>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <ValidationProvider v-slot="{ errors }" name="service" :rules="requiredValidationRule">
                            <v-text-field
                            v-model="model.service"
                            :error-messages="errors"
                            :label="`Service${requiredSign}`"
                            type="text"
                            ></v-text-field>
                        </ValidationProvider>
                    </v-col>
                    <v-col cols="6">
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="domain_name"
                            :rules="requiredValidationRule"
                        >
                            <v-text-field
                            v-model="model.domain_name"
                            :error-messages="errors"
                            :label="`Domain Name${requiredSign}`"
                            type="text"
                            ></v-text-field>
                        </ValidationProvider>
                    </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="web_server"
                    :rules="requiredValidationRule"
                  >
                    <v-text-field
                      v-model="model.web_server"
                      :error-messages="errors"
                      :label="`Web Server${requiredSign}`"
                      type="text"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="mx_record"
                    :rules="requiredValidationRule"
                  >
                    <v-text-field
                      v-model="model.mx_record"
                      :error-messages="errors"
                      :label="`MX Record${requiredSign}`"
                      type="text"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="dns_server"
                    :rules="requiredValidationRule"
                  >
                    <v-text-field
                      v-model="model.dns_server"
                      :error-messages="errors"
                      :label="`DNS Server${requiredSign}`"
                      type="text"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="e_dns_server"
                    :rules="requiredValidationRule"
                  >
                    <v-text-field
                      v-model="model.e_dns_server"
                      :error-messages="errors"
                      :label="`E-DNS Server${requiredSign}`"
                      type="text"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="e_web_server"
                    :rules="requiredValidationRule"
                  >
                    <v-text-field
                      v-model="model.e_web_server"
                      :error-messages="errors"
                      :label="`E-Web Server${requiredSign}`"
                      type="text"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="e_mx_record"
                    :rules="requiredValidationRule"
                  >
                    <v-text-field
                      v-model="model.e_mx_record"
                      :error-messages="errors"
                      :label="`E-MX Record${requiredSign}`"
                      type="text"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>   
                <v-col cols="6">
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
// import { postChangePassword } from "../../api/calls";
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
  name: "TicketForm",
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
  computed: {
      isEdit() {
          return !!this.$route.params.ticketId;
      },
      requiredValidationRule() {
          return this.model.service_type === '2' ? '' : 'required';
      },
      requiredSign() {
          return this.model.service_type === '2' ? '' : '*';
      },
  },
  methods: {
    submit() {
      //   this.$refs.changePasswordForm
      //     .validate()
      //     .then(success => {
      //       if (!success) {
      //         return false;
      //       }
      //       this.loading = true;
      //       postChangePassword(this.model)
      //         .then(() => {
      //           this.$notify("Successfully changed the password");
      //           this.loading = false;
      //           this.model = {};
      //           this.$refs.changePasswordForm.reset();
      //         })
      //         .catch(({ response }) => {
      //           this.loading = false;
      //           if (response.status === 406) {
      //             this.$refs.changePasswordForm.setErrors(response.data.error);
      //             return false;
      //           }
      //           this.$notify(
      //             response.data.error || "Unable to change the password",
      //             "error"
      //           );
      //         });
      //     })
      //     .catch(() => {});
    },
    back() {
        this.$router.push({ name: 'TicketList' });
    },
  }
};
</script>