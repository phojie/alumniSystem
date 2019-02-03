<template>
  <div id="app">
  <v-app id="inspire">
    <!-- 7a170517 -->
    <!-- <v-toolbar style="border-top: 5px solid #990000;background-color:#7a170529" fluid dark fixed app> -->
    <v-toolbar class="jieWhatBg" style="border-top: 5px solid #990000;background-color:#ffffff" absolute  prominent dark  app>
      <span class="hidden-sm-and-down px-5"></span>
      <!-- <span class="hidden-md-and-up"></span> -->
      <v-avatar
        size="50"
      >
        <img src="/imgs/msulnaclogoni.jpg" alt="alt">
      </v-avatar>
      <v-toolbar-title class="titleFont font-weight-black" style="margin-top:-10px;margin-left:5px;color:#990000">Mindanao State University</v-toolbar-title>
      <div class="titleFont" style="color:#07532a;margin-top:20px;margin-left:-260px;">Lanao del Norte Agricultural College</div>
      <v-spacer></v-spacer>
      <span class="blue--text text--darken-3 caption "> 
        {{listofInfo['-RWc9T26A6V_igkRWc9T26A6Va1t'].details.cnumber}}
      </span> 
      <v-divider class="mx-3" inset vertical></v-divider>
      <router-link to="" style="text-decoration: none" class="black--text caption mr-3">Need help?</router-link> 
      <v-toolbar-items style="height:30px" class=" hidden-sm-and-down">
        <v-btn @click="$vuetify.goTo('#first', options)" class="caption textNone" style="color:#990000" flat >
          Events
        </v-btn>
         <v-btn @click="$vuetify.goTo('#zero', options)" class="caption textNone" style="color:#990000" flat >
          Gallery
        </v-btn>
        <!-- <v-btn class="caption textNone" style="color:#990000" flat >
          Alumnus
        </v-btn> -->
        <v-btn @click="$vuetify.goTo('#second', options)"  class="caption textNone" style="color:#990000" flat >
          Community
        </v-btn>

        <v-btn href="https://www.facebook.com/amla.ramainsnd" fab white small flat>
           <v-avatar
             size="25"
           >
           <img src="https://img.icons8.com/color/48/000000/facebook.png">
           </v-avatar>
        </v-btn>
        <!-- <v-btn class="caption textNone" flat style="background-color:#990000" >
          Login
        </v-btn> -->
      </v-toolbar-items>

    </v-toolbar>

    <v-content style="margin-top:-50px"> 
      <section 
      >
      <v-carousel 
        hide-delimiters
        height="450"
        interval="10000"
        hide-controls
        >
        <v-carousel-item
          touchless
          src="http://www.msulnac.edu.ph/data1/images/field.jpg"
        >
        <v-card 
          height="100%"
          style=" background: linear-gradient(90deg, rgba(0, 0, 0, 0.45), rgba(0, 9, 14, 0.46)) 50% center !important; "
        >
        
            <v-layout column align-center justify-center  fill-height >
              <!-- src="https://img.icons8.com/color/1600/000000/spring-logo.png" -->
            <img 
              src="https://img.icons8.com/color/1600/000000/graduation-cap.png"
              height="200">
            <h1 class="font-weight-black white--text mb-2 display-1 text-xs-center">ALUMNI ASSOCIATION</h1>
            <div class="font-weight-black subheading mb-3 text-xs-center">Access Anytime Anywhere</div>

            <v-btn @click="dialog = true" large  class="mb-4" style="background-color:#990000" >MY ALUMNI ACCOUNT</v-btn>
            </v-layout>
        </v-card>
        
        </v-carousel-item>
      </v-carousel>
      </section>
    </v-content>

   

      <section id="first" class="themeColor1">
        <v-container fluid>
        <v-layout row wrap >
        <v-flex xs12 md7 class="scrollbar scrollbar-danger" >
          <h5 class="pa-3 red--text text--darken-4 font-weight-black headline">Events</h5>
          <v-card class=" px-2" flat >
            <v-layout
              column
              wrap
            >   
                <v-layout v-if="listofEvents.length == 0" justify-center row wrap>
                  <v-card class="pa-5" flat>
                    <h3 class="headline "> No Events Posted</h3>
                  </v-card>
                </v-layout>
                <v-layout v-if="listofEvents.length != 0" row wrap >
                  <v-flex v-for="(event, index) in listofEvents" :key="index" xs12>
                    <v-card flat>
                      <v-card-title primary-title>
                        <h4 class=" grey--text"> <span> Date Info: </span> {{event.dateInfo}}</h4>
                      </v-card-title>
                      <v-img
                        :src="event.backgroundPic"
                        aspect-ratio="2.75"
                      ></v-img>

                      <v-card-title primary-title>
                        <div>
                          <h3 class="headline font-weight-black">{{event.title}}</h3> 
                          <div>{{event.details}}</div>
                        </div>
                      </v-card-title>

                      <!-- <v-card-actions> -->
                        <!-- <v-btn flat color="orange">Share</v-btn> -->
                        <!-- <v-btn flat color="orange">Explore</v-btn> -->
                      <!-- </v-card-actions> -->
                    </v-card>
                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>
            </v-layout>

          </v-card>
        </v-flex>

        <v-flex md4 xs12 class="scrollbar scrollbar-danger">
        <v-card class="pa-2 themeColor2" width="100%" >
            <v-layout align-center justify-center row wrap>
              <h4 class=" font-weight-black white--text body-2">ANNOUNCEMENT ALUMNUS</h4>
            </v-layout>
          </v-card>
          <v-card class="px-4" flat >
          <v-layout
            column
            wrap
          >
            <v-layout  column row wrap >
              <v-flex xs12>
              </v-flex>
              <v-flex xs12 v-for="(announce, index) in listofAnnouncement" :key="index" class="mt-3">
                <v-card class="pa-2 themeColor1" width="100%"  >
                  <v-card-title class="font-weight-black" primary-title>
                    {{announce.title}}
                  </v-card-title>
                  <v-layout grey--text text--darken-1 align-center row wrap>
                    {{announce.details}}
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-layout>
          </v-card>
        </v-flex>
        </v-layout>
        </v-container>
      </section>

      <section id="zero" class="themeColor2 mt-4 " >
        <v-layout
          column
          class="pa-3"
          wrap
          align-center
        >
        <h4 class="titleFont white--text " style="font-size:30px">Photo Gallery</h4>
        <h4 class="titleFont grey--text text--lighten-3 " style="font-size:20px">Albums</h4>
        <v-card class="mt-2 pa-4" flat width="50%">
          <v-layout row justify-center align-center wrap>
            <v-btn v-for="(album, index) in listofAlbum" :key="index" @click="openDialog(album)" color="themeColor2 white--text textNone">{{album.title}}</v-btn>
          </v-layout>
        </v-card>
        </v-layout>
       

      </section>

      <section id="second" >
        <v-layout
          column
          wrap
          align-center
        >
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap >
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-avatar
                        size="120"
                        color="blue lighten-4"
                      >
                      <img class="pa-3" src="https://img.icons8.com/color/1600/000000/mission-of-a-company.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Mission </div>
                    </v-card-title>
                    <v-card-text>
                      {{listofInfo['-LXi3l-JeLcgtCqFfHPt'].details}}
                    </v-card-text>
                  </v-card>
                </v-flex>
                
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-avatar
                        size="120"
                        color="green lighten-4"
                      >
                      <img class="pa-3" src="https://img.icons8.com/color/1600/000000/development-skill.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Vision </div>
                    </v-card-title>
                    <v-card-text>
                      {{listofInfo['-LXiJJElv-WLYXzXuOHc'].details}}
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 md4 >
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-avatar
                        size="120"
                        color="amber lighten-4"
                      >
                      <img  class="pa-3" src="https://img.icons8.com/color/1600/000000/school.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Alma matter </div>
                    </v-card-title>
                    <v-card-text>
                      {{listofInfo['-LX_igkRWc9T26A6Va1t'].details}}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

   

      <section 
      >
        <v-card
          style="background-image:url('https://www.mountsinai.org/mshealth/themes/default/media/images/at-a-glance-bkgd.jpg')"
          height="5"
        >
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row align-center wrap >
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        </v-card>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">School info</div>
                </v-card-title>
                <v-card-text>
                  {{listofInfo['-LX_igkRWc9Wc9T2T2'].details}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  {{listofInfo['-RWc9T26A6V_igkRWc9T26A6Va1t'].details.details}}
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="red--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{listofInfo['-RWc9T26A6V_igkRWc9T26A6Va1t'].details.cnumber}}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="red--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{listofInfo['-RWc9T26A6V_igkRWc9T26A6Va1t'].details.location}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon
                      class="red--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Msu@lnac.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card elevation-10>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15811.93715801878!2d123.7347671!3d7.7914875!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa3081a84e338ac5d!2sMSU-LNAC+(Ramain)!5e0!3m2!1sen!2sph!4v1547578756729" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
              <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1975.8684322378183!2d123.77060473802482!3d7.9225297842151985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3254351efc597dc7%3A0xd2dcd2e5f279901e!2sAsentista+Doctors+Hospital!5e0!3m2!1sen!2sph!4v1545407751133" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe> -->
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-footer height="100%" style="background-color:#990000">
        <v-container fluid class="mx-5">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              &copy; 2019
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text" href="#" >Laravel</a>
              and <a class="white--text" href="#">Computer Science Students</a>
            </div>
          </v-flex>
        </v-layout>
        </v-container>
      </v-footer>

    <!-- dialog -->

    <v-dialog v-model="dialog"  max-width="450">
      <v-card>
        <!-- <v-card-title>
          <span class="headline">Alumni Account</span>
        </v-card-title> -->
        <v-card-text>
          <v-layout class="mb-2" wrap align-center justify-center column="">
            <v-avatar
              size="150"
              color="#990000"
            >
              <img src="imgs/amla.png" alt="alt">
            </v-avatar>
          <span class="mt-2 headline font-weight-bold">Alumni Account</span>
          <span class="mt-2 grey--text font-weight-bold">SIGN IN</span>
          </v-layout>
          <v-container grid-list-lg>
            <v-layout wrap>
              <LoginFrame/>
              <!-- <v-flex xs12>
                <v-text-field color="green darken-2" label="Id Number*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field color="green darken-2" label="Password*" type="password" required></v-text-field>
              </v-flex> -->
            </v-layout>
          </v-container>
        </v-card-text>
        
      </v-card>
    </v-dialog>

     <v-dialog v-model="dialogAlbum" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="themeColor2">
          <v-btn icon dark @click="dialogAlbum = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title> {{eventsData.title}} Album </v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Save</v-btn>
          </v-toolbar-items> -->
        </v-toolbar>

        <v-card flat>
        <div
          class="px-5 py-2 subheding grey lighten-2"
          primary-title
        >
          {{eventsData.details}}
        </div>

         <v-flex  xs12>
          <v-card flat>
            <v-container grid-list-sm fluid>
              <v-layout row wrap>
                <v-flex
                  v-for="(img, index) in eventsData.backgroundPic"
                  :key="index"
                  md2
                  sm4
                  xs12
                  d-flex
                >
                  <v-card flat tile class="d-flex">
                    <v-img
                      :src="img"
                      :lazy-src="img"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >
                      <v-layout
                        slot="placeholder"
                        fill-height
                        align-center
                        justify-center
                        ma-0
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-card>
       
       
      </v-card>
    </v-dialog>
  </v-app>
  </div>
</template>

<script>
  import * as easings from 'vuetify/es5/util/easing-patterns'
  import LoginFrame from '../components/LoginFrame'
  export default {
     data () {
      return {
        dialog: false,
        easing: 'easeInOutCubic',
        easings: Object.keys(easings),
        type: 'selector',
        selector: '#first',
        dialogAlbum: false,
        eventsData: {
          backgroundPic:[],
          title: '',
          details: '',
          keyIndex: '', 
        }
      }
    },
    components: {
      LoginFrame
    },
    computed: {
      target () {
        const value = this[this.type]
        if (!isNaN(value)) return Number(value)
        else return value
      },
      listofEvents() {
        var data1 = this.$store.getters.listofEvents
        var data = _.filter(data1,'title')
        console.log('TCL: listofEvents -> data', data)
        return _.reverse(data)
      },
      listofAnnouncement() {
        var data1 = this.$store.getters.listofAnnouncement
        var data = _.filter(data1,'title')
        console.log('TCL: listofAnnouncement -> data', data)
        return _.reverse(data)
      },
      listofInfo() {
        var data1 = this.$store.getters.listofInfo
        return data1
      },
      listofAlbum() {
        var data1 = this.$store.getters.listofAlbum
        return data1
      }
    },
    options () {
      return {
        duration: 300,
        offset:  0,
        easing: this.easing
      }
    },
    methods: {
      openDialog(data) {
        this.dialogAlbum = true
        this.eventsData = {
          backgroundPic: data.backgroundPic,
          title: data.title,
          details: data.details,
          keyIndex: data.keyIndex, 
        }
      }
    }
   
    
  }
</script>
