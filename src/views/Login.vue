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
      <span class="blue--text text--darken-3 caption "> 800.223.2273</span> 
      <v-divider class="mx-3" inset vertical></v-divider>
      <router-link to="" style="text-decoration: none" class="black--text caption mr-3">Need help?</router-link> 
      <v-toolbar-items style="height:30px" class=" hidden-sm-and-down">
        <v-btn @click="$vuetify.goTo(target, options)" class="caption textNone" style="color:#990000" flat >
          Events
        </v-btn>
         <v-btn class="caption textNone" style="color:#990000" flat >
          Gallery
        </v-btn>
        <v-btn class="caption textNone" style="color:#990000" flat >
          Alumnus
        </v-btn>
        <v-btn class="caption textNone" style="color:#990000" flat >
          Community
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



      <section id="first" >
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
                      <img class="pa-3" src="https://img.icons8.com/color/1600/000000/doctor-male.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Our Doctors </div>
                    </v-card-title>
                    <v-card-text>
                      Our find a doctor tool assists you in choosing from our diverse pool of health specialists. Discover better health & wellness by using our doctor ratings & reviews to make your choice. 
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
                      <img class="pa-3" src="https://img.icons8.com/color/1600/000000/point-objects.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Locations & Directions </div>
                    </v-card-title>
                    <v-card-text>
                      慢艺姐界赛听片土 动笑儿兰洗语晚庭早离素其？称方等叫划自总居呀毕？产势孤洲增提班民女向。讲欢放闻行？血意决于后吸号李录放开板赶密简世觉！算清妇雪皮章用叫车举机恶线？欧差两你爱卡追请败马毕跑它法希解。退突唱范华面蜖约义？普模轻约低团英身脑支忙相？
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-avatar
                        size="120"
                        color="amber lighten-4"
                      >
                      <img class="pa-3" src="https://img.icons8.com/color/1600/000000/planner.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Appointments </div>
                    </v-card-title>
                    <v-card-text>
                      慢艺姐界赛听片土狗音就皇初么洗语晚庭早离素其 。讲欢放闻行？血意决于后吸号李录放开板赶密简世觉！算清妇雪皮章用叫车举机恶线？欧差两你爱卡追请败马毕跑它法希解。退突唱范华面蜖约义？普模轻约低团英身脑支忙相？
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
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
                      <img class="pa-3" src="https://img.icons8.com/color/1600/000000/doctor-male.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Our Doctors </div>
                    </v-card-title>
                    <v-card-text>
                      Our find a doctor tool assists you in choosing from our diverse pool of health specialists. Discover better health & wellness by using our doctor ratings & reviews to make your choice. 
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
                      <img class="pa-3" src="https://img.icons8.com/color/1600/000000/point-objects.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Locations & Directions </div>
                    </v-card-title>
                    <v-card-text>
                      慢艺姐界赛听片土 动笑儿兰洗语晚庭早离素其？称方等叫划自总居呀毕？产势孤洲增提班民女向。讲欢放闻行？血意决于后吸号李录放开板赶密简世觉！算清妇雪皮章用叫车举机恶线？欧差两你爱卡追请败马毕跑它法希解。退突唱范华面蜖约义？普模轻约低团英身脑支忙相？
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-avatar
                        size="120"
                        color="amber lighten-4"
                      >
                      <img class="pa-3" src="https://img.icons8.com/color/1600/000000/planner.png">
                      </v-avatar>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center"> Appointments </div>
                    </v-card-title>
                    <v-card-text>
                      慢艺姐界赛听片土狗音就皇初么洗语晚庭早离素其 。讲欢放闻行？血意决于后吸号李录放开板赶密简世觉！算清妇雪皮章用叫车举机恶线？欧差两你爱卡追请败马毕跑它法希解。退突唱范华面蜖约义？普模轻约低团英身脑支忙相？
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
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="red--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="red--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Ramain, Sultan Naga Dimaporo, PH</v-list-tile-title>
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
    },
    options () {
      return {
        duration: 300,
        offset:  0,
        easing: this.easing
      }
    },
   
    
  }
</script>
