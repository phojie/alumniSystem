<template>
  <div>test
    <v-btn class="error" @click="logoutAccount">logout</v-btn>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    logoutAccount() {
      let vm = this
      firebase.auth().signOut().then(
        function() {
          localStorage.removeItem("accountDetails");
          vm.$router.replace({
            path:'/auth',
          })
        }
      )
    }
  }
}
</script>
