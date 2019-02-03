<template>
  <v-app>
    <transition
      name="custom-classes-transition"
    >
      <!-- leave-active-class="animated slideOutLeft" -->
      <!-- enter-active-class="animated tada" -->
      <router-view/>
    </transition>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {
    },
    data () {
      return {
      }
    },
    created() {
      this.$store.dispatch("getEvents")
      this.$store.dispatch("getAlbum")
      this.$store.dispatch("getAnnounce")
      this.$store.dispatch("getInfo")
      this.$store.dispatch("getAccount")
      // console.log(this.$store.getters.listofEvents)
    }
  }
</script>
