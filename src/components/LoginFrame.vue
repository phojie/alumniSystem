<template>
    <v-form style="width:44%;" :loading="valid" @submit.prevent="submitForm">
      <v-card flat class="mb-4 pa-3 body-1" v-if="accountData.isError" style="background-color:#f9dcd1; color:#74290e">
        {{accountData.errorMessage}}
      </v-card>
      <!-- <v-alert class="mb-5 amber" :value="accountData.isError" type="error">{{accountData.errorMessage}}</v-alert> -->
      <v-text-field
        label="Username"
        :disabled="valid"
        single-line
        append-icon="person"
        solo
        background-color="teal lighten-5"
        color="teal"
        v-model="accountData.username"
        :rules="nameRules"
        flat
      ></v-text-field>
      <v-text-field
        label="Password"
        :type="passVisi ? 'text' : 'password'"
        single-line
        solo
        color="teal"
        :disabled="valid"
        flat
        ref="password"
        background-color="teal lighten-5"
        v-model="accountData.password"
        :append-icon="passVisi ? 'visibility_off' : 'visibility'"
        :rules="passRules"
        @click:append="passVisi = !passVisi"
      ></v-text-field>
      <v-btn type="submit" :loading="valid" 
        dark color="teal lighten-1" large block 
        > 
        <v-icon size="18" class="mr-1">mdi-login</v-icon>
        SIGN IN 
      </v-btn>
    </v-form>
</template>

<script>
import firebase from 'firebase';
export default {
  data: () => ({
    valid: false,
    passVisi: false,
    accountData: {
      username: '',
      password: '',
      errorMessage: '',
      isError: false
    },
    nameRules: [
      v => !!v || 'Enter your username',
    ],
    passRules: [
      v => !!v || "Enter your password",
    ]
  }),
  methods: {
    submitForm() {
      this.valid= true
      this.errorMessage = ''
      this.isError = false
      let vm = this
      firebase.auth().signInWithEmailAndPassword(vm.accountData.username, vm.accountData.password).then(
        function (user) {
          const accountDetails = Object.assign({},{user} );
          localStorage.setItem("accountDetails", JSON.stringify(accountDetails));
          vm.$store.commit('saveAccountDetails')
          vm.$router.push('/')
        },
        function(error) {
          // var errorCode = error.code;
          vm.valid= false
          var errorMessage = error.message
          vm.accountData.isError = true
          vm.accountData.password = ''
          vm.$refs.password.focus()
          vm.accountData.errorMessage = 'These credentials do not match our records.'
      })
    }
  }
}
</script>