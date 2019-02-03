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
        <span class="title white--text textCapital"> {{accountDetails.firstname}} {{accountDetails.lastname}} </span>
      </v-layout>
      <v-layout    justify-center class="mr-1 mt-1">
        <span v-if="accountDetails.yeargrad != null" class="caption grey--text text--lighten-2">  {{'Batch ' + accountDetails.yeargrad}} </span>
        <span v-else class="caption grey--text text--lighten-2"> Administrator </span>
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

        <v-subheader class="mt-3 green--text">VIEW</v-subheader>

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

          <v-btn v-if="admin" class="textNone caption transparent" exact-active-class="green"  depressed block to="/Accounts">
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

          <v-btn v-if="!admin" class="textNone caption transparent" exact-active-class="green"  depressed block to="/Profile">
          <v-list-tile-action>
            <v-avatar tile size="23">
              <img src="https://img.icons8.com/ios/50/ffffff/data-setting-filled.png">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Alumnus
            </v-list-tile-title>
          </v-list-tile-content>
          </v-btn>

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
              <v-avatar size="40px" class="pa-3 red lighten-3" >
                <img
                  :src="accountDetails.backgroundPic"
                  alt="Profile"
                >
              </v-avatar>
              </v-btn>
              <v-list dense>
                <v-list-tile v-if="!admin" @click="editData">
                  <v-list-tile-title style="font-size:12px"> <v-icon small color="red darken-3">mdi-account-edit </v-icon> Account</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-if="admin" @click="editAdmin">
                  <v-list-tile-title style="font-size:12px"> <v-icon small color="red darken-3">mdi-account-edit </v-icon> Account</v-list-tile-title>
                </v-list-tile>
                <!-- <v-list-tile @click="dialog5 = true">
                  <v-list-tile-title style="font-size:12px"><v-icon small color="red darken-3">mdi-account-key </v-icon> Change pass</v-list-tile-title>
                </v-list-tile> -->
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

    <v-dialog
      v-model="dialog"
      width="600"
     >
      <v-card
        class="mx-auto"
        max-width="600"
       >
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }} <small class="green--text text--darken-2"> ({{eventsData.idnumber}}) </small></span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window touchless v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-flex xs12 class="mb-2">
                <div v-if="!image">
                  <h2>Profile Picture</h2>
                  <input  accept="image/*"  type="file" @change="onFileChange">
                </div>
                <div v-else>
                  <v-avatar  color="blue lighten-5" size="120">
                    <img class="pa-1" :src="image" />
                  </v-avatar>
                  <v-btn  class="caption textNone" flat ml-2 @click="removeImage">Remove image</v-btn>
                </div>
              </v-flex>
              <v-text-field
                label="Firstname"
                v-model="eventsData.firstname"
              ></v-text-field>
              <v-text-field
                label="Middlename"
                v-model="eventsData.middlename"
              ></v-text-field>
              <v-text-field
                label="Lastname"
                v-model="eventsData.lastname"
              ></v-text-field>
              <v-text-field
                label="College"
                readonly
                disabled
                v-model="eventsData.college"
              ></v-text-field>
              <v-text-field
                label="Year Graduated"
                readonly
                disabled
                v-model="eventsData.yeargrad"
              ></v-text-field>
              
              <v-flex xs12 >
                <v-card
                  v-show="submitStatus != ''"
                  flat
                >
                <span v-if="submitStatus == 'All field is required*'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Id number is already taken'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Loading...'" class="amber--text subheading">{{submitStatus}}</span> 
                <span v-else class="green--text subheading">{{submitStatus}}</span> 

                </v-card>
              </v-flex>

              <!-- <span class="caption grey--text text--darken-1">
                This is the email you will use to login to your Vuetify account
              </span> -->
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
            
              <v-text-field
                label="Address"
                v-model="eventsData.address"
              ></v-text-field>
              <v-text-field
                label="City"
                v-model="eventsData.city"
              ></v-text-field>
              <v-text-field
                label="Province"
                v-model="eventsData.province"
              ></v-text-field>
              <v-text-field
                label="Contact No"
                v-model="eventsData.contactno"
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="eventsData.email"
              ></v-text-field>

              <v-divider></v-divider>

              <v-radio-group v-model="eventsData.selfemployed" :mandatory="false">
              <label for="" class="mb-1 grey--text">Self employed</label>
                <v-radio label="Yes" value="Yes"></v-radio><v-radio label="No" value="No"></v-radio>
              </v-radio-group>
              <v-text-field
                label="Company Name"
                v-model="eventsData.companyname"
              ></v-text-field>
              <v-text-field
                label="Company Address"
                v-model="eventsData.companyaddress"
              ></v-text-field>
              <v-text-field
                label="Company No"
                v-model="eventsData.companyno"
              ></v-text-field>
              <v-text-field
                label="Position"
                v-model="eventsData.position"
              ></v-text-field>
              <v-text-field
                label="Department"
                v-model="eventsData.department"
              ></v-text-field>
             
              
              <v-flex xs12 >
                <v-card
                  v-show="submitStatus != ''"
                  flat
                >
                <span v-if="submitStatus == 'All field is required*'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Id number is already taken'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Loading...'" class="amber--text subheading">{{submitStatus}}</span> 
                <span v-else class="green--text subheading">{{submitStatus}}</span> 

                </v-card>
              </v-flex>

              <!-- <span class="caption grey--text text--darken-1">
                This is the email you will use to login to your Vuetify account
              </span> -->
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <v-card-text>
              <v-text-field
                type="password"
                label="Password"
                v-model="eventsData.password"
              ></v-text-field>
              
              <v-text-field
                label="Confirm Password"
                v-model="eventsData.cpassword"
                type="password"
              ></v-text-field>

              <v-flex xs12 >
                <v-card
                  v-show="submitStatus != ''"
                  flat
                >
                <span v-if="submitStatus == 'All field is required*'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Password and confirmation password does not match'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Loading...'" class="amber--text subheading">{{submitStatus}}</span> 
                <span v-else class="green--text subheading">{{submitStatus}}</span> 

                </v-card>
              </v-flex>

              <span class="caption grey--text text--darken-1">
                Please enter a password for <span class="green--text textCapital">{{eventsData.lastname}}'s</span>  account
              </span>
              
            </v-card-text>
          </v-window-item>

        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :disabled="step === 1"
            flat
            @click="step--"
          >
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            depressed
            @click="submitEdit"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

     <v-dialog
      v-model="dialog2"
      persistent 
      width="600"
     >
      <v-card
        class="mx-auto"
        max-width="600"
       >
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>My Account</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

            <v-card-text>
              <v-flex xs12 class="mb-4">
                <div v-if="!image">
                  <h2>Profile Picture</h2>
                  <input  accept="image/*"  type="file" @change="onFileChange">
                </div>
                <div v-else>
                  <v-avatar  color="blue lighten-5" size="120">
                    <img class="pa-1" :src="image" />
                  </v-avatar>
                  <v-btn  class="caption textNone" flat ml-2 @click="removeImage">Remove image</v-btn>
                </div>
              </v-flex>

              <v-text-field
                label="Username"
                v-model="eventsData.idnumber"
              ></v-text-field>
              <v-text-field
                label="Firstname"
                v-model="eventsData.firstname"
              ></v-text-field>
              <v-text-field
                label="Middlename"
                v-model="eventsData.middlename"
              ></v-text-field>
              <v-text-field
                label="Lastname"
                v-model="eventsData.lastname"
              ></v-text-field>
              <v-text-field
                label="Old password"
                type="password"
                v-model="eventsData.oldpass"
              ></v-text-field>
              <v-text-field
                label="password"
                type="password"
                v-model="eventsData.password"
              ></v-text-field>
              <v-text-field
                label="Confirm password"
                type="password"
                v-model="eventsData.cpassword"
              ></v-text-field>
             
              <v-flex xs12 >
                <v-card
                  v-show="submitStatus != ''"
                  flat
                >
                <span v-if="submitStatus == 'All field is required*'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Old password is wrong'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Password and confirmation password does not match'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Id number is already taken'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Loading...'" class="amber--text subheading">{{submitStatus}}</span> 
                <span v-else class="green--text subheading">{{submitStatus}}</span> 

                </v-card>
              </v-flex>

              <!-- <span class="caption grey--text text--darken-1">
                This is the email you will use to login to your Vuetify account
              </span> -->
            </v-card-text>


        <v-divider></v-divider>

        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            depressed
            flat
            @click="dialog2 = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            depressed
            @click="submitAdmin"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
</template>

<script>
import firebase from 'firebase'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: { 
    eventsData: {
      idnumber: {required},
      firstname: {required},
      middlename: {required},
      lastname: {required},
      password: {required},
      cpassword: {required},
      college: {required},
      yeargrad: {required}
    },
  },
  data: () => ({
    drawer: true,
    dialog: false,
    dialog2: false,
    step: 1,
    submitStatus: '',
    image:  '',
    eventsData: {
        keyIndex: '',
        backgroundPic: '',
        idnumber: '',
        firstname: '',
        middlename: '',
        password:'',
        cpassword:'',
        lastname: '',
        yeargrad: '',
        college: '',

        oldpass:'',
        oldpassdummy:'',
        type: '',

        address: '',
        city: '',
        province: '',
        contactno: '',
        email: '',
        selfemployed: '',
        companyname: '',
        companyaddress: '',
        companyno: '',
        position : '',
        department: '',
      },
  }),
  computed: {
    accountDetails() {
      var obUser = JSON.parse(localStorage.getItem('accountDetails') );
			// console.log('​accountDetails -> obUser', obUser)
      return obUser
    },
    currentTitle () {
      switch (this.step) {
        case 1: return 'Account Information'
        case 2: return 'Personal Information'
        default: return 'Password'
      }
    },
    admin () {
      var accountDetails = localStorage.getItem('accountDetails')
      var data = JSON.parse(accountDetails);
      if(data.type == 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    submitAdmin() {
      this.eventsData.college = 'wer'
      this.eventsData.yeargrad = 'ewr'
      var validID = _.filter(this.$store.getters.listofAccount, ['idnumber',_.capitalize(this.eventsData.idnumber)])
      if(validID.length != 0  && validID[0].keyIndex != this.eventsData.keyIndex) {
          this.submitStatus = 'Id number is already taken'
        } else {
          this.$v.$touch()
          if (this.$v.eventsData.$invalid) {
            this.submitStatus = 'All field is required*'
          } else if(this.eventsData.oldpass != this.eventsData.oldpassdummy) {
            this.submitStatus = 'Old password is wrong'
          } else if(this.eventsData.password != this.eventsData.cpassword) {
          this.submitStatus = 'Password and confirmation password does not match'
          } else {
            // do your submit logic here
            this.submitStatus = 'Loading...'
            setTimeout(() => {
              this.submitAdminNow()
              this.submitStatus = null
            }, 500)
          }
        }
    },
    submitAdminNow() {
      let vm = this
      var newPostKey = vm.eventsData.keyIndex
      var storageRef = firebase.storage().ref();

        if(vm.image !=  this.eventsData.backgroundPic) {
          var uploadTask = storageRef.child(`accountUser/` + newPostKey).putString(vm.image, 'data_url')
          uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
          }, function(error) {
          }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              vm.eventsData.backgroundPic = downloadURL
              var adddata = firebase.database().ref().child('accountUser/'+newPostKey)
              adddata.update({
                keyIndex: newPostKey,
                backgroundPic: vm.eventsData.backgroundPic,
                idnumber: vm.eventsData.idnumber,
                fullname: _.capitalize(vm.eventsData.firstname) + ' '+ _.capitalize(vm.eventsData.lastname) + ' ' + _.capitalize(vm.eventsData.yeargrad) + ' ' + _.capitalize(vm.eventsData.college),
                firstname: _.capitalize(vm.eventsData.firstname),
                middlename: _.capitalize(vm.eventsData.firstname),
                lastname: _.capitalize(vm.eventsData.lastname),
                password: vm.eventsData.password,
              })

              localStorage.removeItem('accountDetails')
              // vm.snackbar3= true
              localStorage.setItem("accountDetails", JSON.stringify(vm.eventsData));
              vm.dialog2= false
              vm.submitStatus = null
              vm.image = ''

            })
          })
      } else {
        var adddata = firebase.database().ref().child('accountUser/'+newPostKey)
        adddata.update({
          keyIndex: newPostKey,
          backgroundPic: vm.eventsData.backgroundPic,
          idnumber: vm.eventsData.idnumber,
          fullname: _.capitalize(vm.eventsData.firstname) + ' '+ _.capitalize(vm.eventsData.lastname) + ' ' + _.capitalize(vm.eventsData.yeargrad) + ' ' + _.capitalize(vm.eventsData.college),
          firstname: _.capitalize(vm.eventsData.firstname),
          middlename: _.capitalize(vm.eventsData.firstname),
          lastname: _.capitalize(vm.eventsData.lastname),
          password: vm.eventsData.password,
        })
        
        localStorage.removeItem('accountDetails')
        vm.image = ''
        vm.dialog2= false
        // vm.snackbar3= true
        vm.submitStatus = null
        localStorage.setItem("accountDetails", JSON.stringify(vm.eventsData));
      }
    },
    submitEdit() {
      var validID = _.filter(this.$store.getters.listofAccount, ['idnumber',_.capitalize(this.eventsData.idnumber)])
      if(this.step === 1) {
        this.eventsData.password = 'dummy'
        this.eventsData.cpassword = 'dummy'
        if(validID.length != 0  && validID[0].keyIndex != this.eventsData.keyIndex) {
          this.submitStatus = 'Id number is already taken'
        } else {
          this.$v.$touch()
          if (this.$v.eventsData.$invalid) {
            this.submitStatus = 'All field is required*'
          } else {
            // do your submit logic here
            this.eventsData.password = ''
            this.eventsData.cpassword = ''
            this.submitStatus = 'Loading...'
            setTimeout(() => {
              this.step++
              this.submitStatus = null
            }, 500)
          }
        }
      } else if(this.step === 3) {
        this.$v.$touch()
        if (this.$v.eventsData.$invalid) {
          this.submitStatus = 'All field is required*'
        } else if(this.eventsData.password != this.eventsData.cpassword) {
          this.submitStatus = 'Password and confirmation password does not match'
        } else {
          // do your submit logic here
          this.submitStatus = 'Loading...'
          setTimeout(() => {
            this.step++
            this.editNow()
          }, 500)
        }
      }
    else if(this.step === 2) {
      this.step++
    }
    },
    editNow() {
      let vm = this
      var newPostKey = vm.eventsData.keyIndex
      var storageRef = firebase.storage().ref();

        if(vm.image !=  this.eventsData.backgroundPic) {
          var uploadTask = storageRef.child(`accountUser/` + newPostKey).putString(vm.image, 'data_url')
          uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
          }, function(error) {
          }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              vm.eventsData.backgroundPic = downloadURL
              var adddata = firebase.database().ref().child('accountUser/'+newPostKey)
              adddata.update({
                keyIndex: newPostKey,
                backgroundPic: vm.eventsData.backgroundPic,
                idnumber: vm.eventsData.idnumber,
                fullname: _.capitalize(vm.eventsData.firstname) + ' '+ _.capitalize(vm.eventsData.lastname) + ' ' + _.capitalize(vm.eventsData.yeargrad) + ' ' + _.capitalize(vm.eventsData.college),
                firstname: _.capitalize(vm.eventsData.firstname),
                middlename: _.capitalize(vm.eventsData.firstname),
                lastname: _.capitalize(vm.eventsData.lastname),
                password: vm.eventsData.password,
                yeargrad: _.capitalize(vm.eventsData.yeargrad),
                college: _.capitalize(vm.eventsData.college),

                address: _.capitalize(vm.eventsData.address),
                city: _.capitalize(vm.eventsData.city),
                province: _.capitalize(vm.eventsData.province),
                contactno: _.capitalize(vm.eventsData.contactno),
                email: _.capitalize(vm.eventsData.email),
                selfemployed: _.capitalize(vm.eventsData.selfemployed),
                companyname:_.capitalize(vm.eventsData.companyname),
                companyaddress: _.capitalize(vm.eventsData.companyaddress),
                companyno: _.capitalize(vm.eventsData.companyno),
                position : _.capitalize(vm.eventsData.position),
                department:_.capitalize(vm.eventsData.department),
              })

              localStorage.removeItem('accountDetails')
              vm.image = ''
              vm.dialog= false
              // vm.snackbar3= true
              vm.submitStatus = null
              vm.step = 1
              localStorage.setItem("accountDetails", JSON.stringify(vm.eventsData));

            })
          })
      } else {
        var adddata = firebase.database().ref().child('accountUser/'+newPostKey)
        adddata.update({
          keyIndex: newPostKey,
          backgroundPic: vm.eventsData.backgroundPic,
          idnumber: vm.eventsData.idnumber,
          fullname: _.capitalize(vm.eventsData.firstname) + ' '+ _.capitalize(vm.eventsData.lastname) + ' ' + _.capitalize(vm.eventsData.yeargrad) + ' ' + _.capitalize(vm.eventsData.college),
          firstname: _.capitalize(vm.eventsData.firstname),
          middlename: _.capitalize(vm.eventsData.firstname),
          lastname: _.capitalize(vm.eventsData.lastname),
          password: vm.eventsData.password,
          yeargrad: _.capitalize(vm.eventsData.yeargrad),
          college: _.capitalize(vm.eventsData.college),

          address: _.capitalize(vm.eventsData.address),
          city: _.capitalize(vm.eventsData.city),
          province: _.capitalize(vm.eventsData.province),
          contactno: _.capitalize(vm.eventsData.contactno),
          email: _.capitalize(vm.eventsData.email),
          selfemployed: _.capitalize(vm.eventsData.selfemployed),
          companyname:_.capitalize(vm.eventsData.companyname),
          companyaddress: _.capitalize(vm.eventsData.companyaddress),
          companyno: _.capitalize(vm.eventsData.companyno),
          position : _.capitalize(vm.eventsData.position),
          department:_.capitalize(vm.eventsData.department),
        })
        
        localStorage.removeItem('accountDetails')
        vm.image = ''
        vm.dialog= false
        // vm.snackbar3= true
        vm.submitStatus = null
        vm.step = 1
        localStorage.setItem("accountDetails", JSON.stringify(vm.eventsData));
      }

    },
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
    },
    editAdmin() {
      var data = this.accountDetails
      this.image = data.backgroundPic
      this.step = 1
      var wellsee
      
      this.eventsData= {
        keyIndex: data.keyIndex,
        backgroundPic: data.backgroundPic,
        idnumber: data.idnumber,
        firstname: data.firstname,
        middlename: data.middlename,
        lastname: data.lastname,
        oldpassdummy: data.password,
      }

      this.dialog2 = true
    },
    editData() {
      var data = this.accountDetails
      this.image = data.backgroundPic
      this.step = 1
      var wellsee
      
      this.eventsData= {
        keyIndex: data.keyIndex,
        backgroundPic: data.backgroundPic,
        idnumber: data.idnumber,
        firstname: data.firstname,
        middlename: data.middlename,
        lastname: data.lastname,
        college: data.college,
        yeargrad: data.yeargrad,
        password: data.password,

        type: data.type,

        address: data.address,
        city: data.city,
        province: data.province,
        contactno: data.contactno,
        email: data.email,
        selfemployed: wellsee,
        companyname: data.companyname,
        companyaddress: data.companyaddress,
        companyno: data.companyno,
        position : data.position,
        department: data.department,
      }
      this.dialog = true
      this.submitStatus = ''
    },
    onFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
      return;
    this.createImage(files[0]);
    },
     createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = ''
    },
  }
}
</script>
