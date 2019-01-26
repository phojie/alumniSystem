<template>
    <v-form  ref="form" v-model="validtest" :loading="valid" @submit.prevent="submitForm">
      <v-card flat class="mb-4 pa-3 body-1" v-if="accountData.isError" style="background-color:#f9dcd1; color:#74290e">
        {{accountData.errorMessage}}
      </v-card>
      <!-- <v-alert class="mb-5 amber" :value="accountData.isError" type="error">{{accountData.errorMessage}}</v-alert> -->
      <v-text-field
        label="Username"
        color="blue darken-2"
        :disabled="valid"
        flat
        class="jieinput"
        v-model="accountData.username"
        :rules="nameRules"
        append-icon="person"
      ></v-text-field>
      <v-text-field
        :type="passVisi ? 'text' : 'password'"
        color="blue darken-2"
        :disabled="valid"
        flat
        ref="password"
        label="Password"
        class="jieinput"
        v-model="accountData.password"
        :append-icon="passVisi ? 'visibility_off' : 'visibility'"
        :rules="passRules"
        @click:append="passVisi = !passVisi"
      ></v-text-field>
      <v-btn type="submit" :loading="valid" 
        dark color="blue darken-2" large block 
        class="mt-4 textNone"
        style="border-radius:4px"
        > 
        <v-icon size="18" class="mr-1">mdi-login-variant</v-icon>
        Sign in
      </v-btn>
    </v-form>
</template>

<script>
import firebase from 'firebase';
export default {
  data: () => ({
    loading: false,
    validtest:true,
    valid: false,
    passVisi: false,
    accountData: {
      username: '',
      password: '',
      errorMessage: '',
      isError: false
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    nameRules: [
      v => !!v || 'Enter your username',
    ],
    passRules: [
      v => !!v || "Enter your password",
    ]
  }),
  computed: {
  },
  methods: {
    submitForm: function() {
        if (this.$refs.form.validate()) {
          this.valid= true
            let vm = this
            vm.errorMessage = ''
            vm.isError = false
      setTimeout(function(){
            firebase.database().ref('accountUser').on('value', function(snapshot) {
            var findUser = _.find(snapshot.val(), {'username': _.capitalize(vm.accountData.username), 'password': vm.accountData.password})
            // var findEmail = _.find(snapshot.val(), {'email': _.capitalize(vm.accountData.username), 'password': vm.accountData.password})
            //  || findEmail != null
             if(findUser != null ) {
                // vm.$store.dispatch("getRooms")
                // vm.$store.dispatch('getAccountUser')
                // vm.$store.dispatch('getAppointments')
                localStorage.setItem("accountDetails", JSON.stringify(findUser));
                vm.$router.push('/')

              } else {
                vm.valid= false
                vm.accountData.isError = true
                vm.accountData.password = ''
                vm.$refs.password.focus()
                vm.accountData.errorMessage = 'These credentials do not match our records.'
              }
            })
      }, 1000);

        }
    },

  }
}
</script>