<template>
  <v-layout>
    <v-flex md6 sm12>
      <v-card height="100%">
        <v-layout column wrap justify-center fill-height align-center>
          <div class="mb-5 text-xs-center">
              <div class="display-1 font-weight-black">Lazcom<span class="teal--text">.com</span></div>
              <span class="caption font-weight-bold grey--text" style="letter-spacing:2px">SIGN IN</span>
          </div>
          <LoginFrame/>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex md6 hidden-sm-and-down>
       <v-responsive
        class="bgright white--text"
        height="100%"
      >
      <!-- <v-card :gradient="gradient" class="bgright" style="border-radius:0px !important;"  height="100%"> -->
        <v-layout justify-center fill-height style="background-color:#4db6aca8 !important;">
          <v-card-title primary-title>
            <div>
              <div style='letter-spacing:3px !important;' class="display-3 font-weight-black">Sales and Inventory System</div>
              <div style='letter-spacing:2px !important;' class="body-1 font-weight-bold">Lazcom Maranding Branch </div>
              <v-divider class="my-3" style=""></v-divider>
              <div style='letter-spacing:1px !important;' class="font-weight-bold subheading">The tool that saves you time and stress with managing your sales and inventory.</div>
            </div>
          </v-card-title>
        </v-layout>
      </v-responsive>
    </v-flex>
  </v-layout>
</template>

<script>
  import LoginFrame from '../components/LoginFrame'
  export default {
    data: () => ({
    }),
    components: {
      LoginFrame
    }
    
  }
</script>
