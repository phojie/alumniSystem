<template>
  <div id="app">
    <v-app
      id="inspire"
    >
        <!-- clipped -->
      <v-navigation-drawer
        fixed
        dark
        width="280"
        v-model="drawer"
        app
      >
       <v-layout justify-center class="mt-3 mr-1">
        <v-avatar color="white" size="100">
          <img src="https://img.icons8.com/color/1600/000000/verified-account.png">
        </v-avatar>
      </v-layout>
      <v-layout justify-center class="mt-4 mr-1">
        <span class="title white--text"> Admin Panel</span>
      </v-layout>
      <v-divider class="mt-4 mx-4 green " ></v-divider>
      <v-list dense class="">
        <v-card class="pa-4" flat  width="280">
        <!-- <v-btn  class="textNone caption transparent" exact-active-class="green"  depressed block to="Administrator">
          <v-list-tile-action>
            <v-avatar size="23">
              <img src="https://img.icons8.com/ios/50/ffffff/services-filled.png">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Dashboard
            </v-list-tile-title>
          </v-list-tile-content>
          </v-btn> -->

        <v-subheader class="mt-3 green--text">MANAGE</v-subheader>

          <v-btn  class="textNone caption transparent" exact-active-class="green"  depressed block to="/Events">
          <v-list-tile-action>
            <v-avatar tile size="23">
              <img src="https://img.icons8.com/ios/50/ffffff/calendar-filled.png">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Events
            </v-list-tile-title>
          </v-list-tile-content>
          </v-btn>

          
          <v-btn class="textNone caption transparent" exact-active-class="green"  depressed block to="/Gallery">
          <v-list-tile-action>
            <v-avatar tile size="23">
              <img src="https://img.icons8.com/ios/50/ffffff/medium-icons-filled.png">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Gallery
            </v-list-tile-title>
          </v-list-tile-content>
          </v-btn>

          <v-btn class="textNone caption transparent" exact-active-class="green"  depressed block to="/Announcement">
          <v-list-tile-action>
            <v-avatar tile size="22">
              <img src="https://img.icons8.com/ios/50/ffffff/about-filled.png">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Announncements
            </v-list-tile-title>
          </v-list-tile-content>
          </v-btn>

          <v-btn class="textNone caption transparent" exact-active-class="green"  depressed block to="/Accounts">
          <v-list-tile-action>
            <v-avatar tile size="23">
              <img src="https://img.icons8.com/ios/50/ffffff/find-user-male-filled.png">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Accounts
            </v-list-tile-title>
          </v-list-tile-content>
          </v-btn>
        <v-btn  class="textNone caption transparent" exact-active-class="green"  depressed block to="/Msu">
          <v-list-tile-action>
            <v-avatar tile size="23">
              <img src="https://img.icons8.com/ios/50/ffffff/school-filled.png">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Msu
            </v-list-tile-title>
          </v-list-tile-content>
          </v-btn>

          <!-- <v-btn class="textNone caption transparent" exact-active-class="green"  depressed block to="/Profile">
          <v-list-tile-action>
            <v-avatar tile size="23">
              <img src="https://img.icons8.com/ios/50/ffffff/data-setting-filled.png">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Profile
            </v-list-tile-title>
          </v-list-tile-content>
          </v-btn> -->

        </v-card>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="grey darken-1">copyright</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">2019 Computer Science </v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-navigation-drawer>
       <!-- clipped-left  -->
      <v-toolbar class="jieWhatBg" style="border-top: 5px solid #990000;background-color:#ffffff" absolute  prominent dark  app>
        <!-- <span class="hidden-sm-and-down px-5"></span> -->
        <!-- <span class="hidden-md-and-up"></span> -->
        <v-avatar
          size="50"
        >
          <img src="/imgs/msulnaclogoni.jpg" alt="alt">
        </v-avatar>
        <v-toolbar-title class="titleFont font-weight-black" style="margin-top:-10px;margin-left:5px;color:#990000">Mindanao State University</v-toolbar-title>
        <div class="titleFont" style="color:#07532a;margin-top:20px;margin-left:-260px;">Lanao del Norte Agricultural College</div>
        <v-spacer></v-spacer>
        <!-- <v-toolbar-items style="height:30px" class=" hidden-sm-and-down"> -->
          <!-- <v-btn @click="logoutAccount" class="caption textNone" style="color:#990000" flat >
            Logout
          </v-btn> -->
          
          <v-menu left offset-y min-width="140">
              <v-btn  
              slot="activator" icon large>
              <v-avatar size="40px" class="pa-3 red lighten-2" >
                <img
                  :src="accountDetails.backgroundPic"
                  alt="Profile"
                >
              </v-avatar>
              </v-btn>
              <v-list dense>
                <!-- <v-list-tile>
                  <v-list-tile-title style="font-size:12px"> <v-icon small color="red darken-3">mdi-account-edit </v-icon> Account</v-list-tile-title>
                </v-list-tile> -->
                <v-list-tile @click="dialog5 = true">
                  <v-list-tile-title style="font-size:12px"><v-icon small color="red darken-3">mdi-account-key </v-icon> Change pass</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="logoutAccount">
                  <v-list-tile-title style="font-size:12px"><v-icon small color="red darken-3">mdi-logout-variant </v-icon> Logout</v-list-tile-title>
                </v-list-tile>
              </v-list>
          </v-menu>
        <!-- </v-toolbar-items> -->
      </v-toolbar>
      <v-content class="themeColor1">
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data: () => ({
    drawer: true,
    dialog: true
  }),
  computed: {
    accountDetails() {
      var obUser = JSON.parse(localStorage.getItem('accountDetails') );
			// console.log('​accountDetails -> obUser', obUser)
      return obUser
    },
    
  },
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
