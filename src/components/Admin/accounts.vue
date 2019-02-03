<template>
  <v-container  grid-list-lg>
    <v-layout row wrap >
    <v-flex xs12>
      <v-card width="100%" class="px-4 py-2" >
        <v-layout align-center row wrap>
          <h6 class="title"> List of Alumnus </h6>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          color="red darken-4"
          hide-details
          flat
          solo=""
        ></v-text-field>
        <v-btn v-if="admin" @click="newAccount" class=" textNone" color="red darken-3" flat dark>New Account</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
   
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="listofAlumnus"
        :search="search"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td><v-avatar
            size="30"
            color="themeColor1"
          >
            <img :src="props.item.backgroundPic" alt="Profile Pic">
          </v-avatar></td>
          <td>{{ props.item.firstname }}</td>
          <td class="">{{ props.item.lastname }}</td>
          <td class="">{{ props.item.yeargrad }}</td>
          <td class="">{{ props.item.college }}</td>
          <td class=" ">
            <v-icon
              small
              class="mr-2"
              @click="viewItem(props.item)"
            >
              mdi-view-grid
            </v-icon>
            <v-icon
              small
              v-if="admin"
              class="mr-2"
              @click="editData(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              v-if="admin"
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-flex>
    </v-layout>
  

    <!-- dialog -->
    <v-dialog v-model="dialog5"  max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline red--text text--darken-4">{{eventsData.firstname+ ' ' +eventsData.middlename+ ' ' +eventsData.lastname}} </span> <span class="headline">&nbsp; Profile</span>
        </v-card-title>
       
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 class="mb-3">
                <v-layout justify-center row wrap>
                <v-avatar
                    size="120"
                    color="themeColor1"
                  >
                    <img :src="eventsData.backgroundPic" alt="alt">
                  </v-avatar>
                </v-layout>
              </v-flex>
          

              <v-flex xs12>
              <v-text-field
                label="Batch"
                readonly=""
                v-model="eventsData.yeargrad"
              ></v-text-field>
              <v-text-field
                label="Address"
                readonly=""
                v-model="eventsData.address"
              ></v-text-field>
              <v-text-field
                readonly=""
                label="City"
                v-model="eventsData.city"
              ></v-text-field>
              <v-text-field
                readonly=""
                label="Province"
                v-model="eventsData.province"
              ></v-text-field>
              <v-text-field
                readonly=""
                label="Contact No"
                v-model="eventsData.contactno"
              ></v-text-field>
              <v-text-field
                readonly=""
                label="Email"
                v-model="eventsData.email"
              ></v-text-field>

              <v-divider></v-divider>

              <v-radio-group 
                readonly=""
                v-model="eventsData.selfemployed" :mandatory="false">
                <label for="" class="mb-1 grey--text">Self employed</label>
                <v-radio label="Yes" value="Yes"></v-radio><v-radio label="No" value="No"></v-radio>
              </v-radio-group>
              <v-text-field
                readonly=""
                label="Company Name"
                v-model="eventsData.companyname"
              ></v-text-field>
              <v-text-field
                readonly=""
                label="Company Address"
                v-model="eventsData.companyaddress"
              ></v-text-field>
              <v-text-field
                readonly=""
                label="Company No"
                v-model="eventsData.companyno"
              ></v-text-field>
              <v-text-field
                label="Position"
                readonly=""
                v-model="eventsData.position"
              ></v-text-field>
              <v-text-field
                label="Department"
                readonly=""
                v-model="eventsData.department"
              ></v-text-field>
              </v-flex>
             

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog5 = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog
      v-model="dialog"
      width="600"
     >
      <v-card
        class="mx-auto"
        max-width="600"
       >
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
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
              <v-text-field
                label="ID No"
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
                label="College"
                v-model="eventsData.college"
              ></v-text-field>
              <v-text-field
                label="Year Graduated"
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

          <v-window-item :value="3">
            <div class="pa-3 text-xs-center">
              <v-img
                class="mb-3"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              ></v-img>
              <h3 class="title font-weight-light mb-2">Welcome</h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
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
            :disabled="step === 3"
            color="primary"
            depressed
            @click="submit"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <v-dialog
      v-model="dialog3"
      max-width="290"
    >
      <v-card>
        <v-card-title class="subheading">Are you sure you want to delete this account</v-card-title>

        <v-card-text>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary darken-1"
            flat="flat"
            @click="dialog3 = false"
          >
            No
          </v-btn>

          <v-btn
            color="error darken-1"
            flat="flat"
            @click="deleteNow"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog4"
      width="600"
    >
      <v-card
        class="mx-auto"
        max-width="600"
       >
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle2 }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step2"
          ></v-avatar>
        </v-card-title>

        <v-window touchless v-model="step2">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                label="ID No"
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
                label="College"
                v-model="eventsData.college"
              ></v-text-field>
              <v-text-field
                label="Year Graduated"
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

          <v-window-item :value="3">
            <div class="pa-3 text-xs-center">
              <v-img
                class="mb-3"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              ></v-img>
              <h3 class="title font-weight-light mb-2">Welcome</h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :disabled="step2 === 1"
            flat
            @click="step2--"
          >
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="step2 === 3"
            color="primary"
            depressed
            @click="submitEdit"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

    
    <v-snackbar
      v-model="snackbar"
    >
      Successfully Added account
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-snackbar
      v-model="snackbar2"
    >
      Successfully deleted account
      <v-btn
        color="pink"
        flat
        @click="snackbar2 = false"
      >
        Close
      </v-btn>
    </v-snackbar>

     <v-snackbar
      v-model="snackbar3"
    >
      Successfully Updated account
      <v-btn
        color="pink"
        flat
        @click="snackbar3 = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase';
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
  data() {
    return {
      search: '',
      step: 1,
      step2: 1,
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      dialog: false,
      show: false,
      image: '',
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
      submitStatus: null,
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      headers: [
      {
        text: 'Profile',
        align: 'left',
        sortable: false,
        value: 'backgroundPic'
      },
      { text: 'Firstname', value: 'firstname' },
      { text: 'Lastname', value: 'lastname' },
      { text: 'Year Graduated', value: 'yeargrad' },
      { text: 'College', value: 'college' },
      { text: 'Actions', value: 'fullname', sortable: false, }
    ],
    }
  },
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    currentTitle () {
      switch (this.step) {
        case 1: return 'Registration form'
        case 2: return 'Create a password'
        default: return 'Account created'
      }
    },
    currentTitle2 () {
      switch (this.step2) {
        case 1: return 'Account info'
        case 2: return 'Change password'
        default: return 'Account created'
      }
    },
    listofAlumnus() {
      var data1 = this.$store.getters.listofAccount
      var data = _.filter(data1,'yeargrad')
      return _.reverse(data)
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
    viewItem(data) {
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

        address: data.address,
        city: data.city,
        province: data.province,
        contactno: data.contactno,
        email: data.email,
        selfemployed: data.selfemployed,
        companyname: data.companyname,
        companyaddress: data.companyaddress,
        companyno: data.companyno,
        position : data.position,
        department: data.department,
      }

      this.dialog5 = true
    },
    submitEdit() {
      var validID = _.filter(this.$store.getters.listofAccount, ['idnumber',_.capitalize(this.eventsData.idnumber)])
      if(this.step2 === 1) {
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
              this.step2++
              this.submitStatus = null
            }, 500)
          }
        }
      } else if(this.step2 === 2) {
        this.$v.$touch()
        if (this.$v.eventsData.$invalid) {
          this.submitStatus = 'All field is required*'
        } else if(this.eventsData.password != this.eventsData.cpassword) {
          this.submitStatus = 'Password and confirmation password does not match'
        } else {
          // do your submit logic here
          this.submitStatus = 'Loading...'
          setTimeout(() => {
            this.step2++
            this.editNow()
          }, 500)
        }
      }
    },
    editNow() {
      let vm = this
      var newPostKey = vm.eventsData.keyIndex
      var storageRef = firebase.storage().ref();
  
        var adddata = firebase.database().ref().child('accountUser/'+newPostKey)
        adddata.update({
          keyIndex: newPostKey,
          backgroundPic: vm.eventsData.backgroundPic,
          idnumber: vm.eventsData.idnumber,
          fullname: _.capitalize(vm.eventsData.firstname) + ' '+ _.capitalize(vm.eventsData.lastname) + ' ' + _.capitalize(vm.eventsData.yeargrad) + ' ' + _.capitalize(vm.eventsData.college),
          firstname: _.capitalize(vm.eventsData.firstname),
          middlename: _.capitalize(vm.eventsData.firstname),
          lastname: _.capitalize(vm.eventsData.lastname),
          password: _.capitalize(vm.eventsData.password),
          yeargrad: _.capitalize(vm.eventsData.yeargrad),
          college: _.capitalize(vm.eventsData.college),
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
        })
        vm.image = ''
        vm.dialog4= false
        vm.snackbar3= true
        vm.submitStatus = null
        vm.step2 = 1

        vm.eventsData={
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
        }
    },
    editData(data) {
      this.step2 = 1
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
      }
      this.dialog4 = true
      this.submitStatus = ''
    },
    deleteNow() {
      firebase.database().ref().child('accountUser/'+this.eventsData.keyIndex).remove()
      this.dialog3 = false
      this.snackbar2 = true
    },
    deleteItem(data) {
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
      }
      this.dialog3 = true
    },
    newAccount() {
      this.eventsData={
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
      }
      this.dialog = true
      this.submitStatus = ''
    },
    submit() {
      var validID = _.filter(this.$store.getters.listofAccount, ['idnumber',_.capitalize(this.eventsData.idnumber)])
      if(this.step === 1) {
        this.eventsData.password = 'dummy'
        this.eventsData.cpassword = 'dummy'
        if(validID.length != 0) {
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
              // this.saveNew()
              // this.snackbar= true
              this.submitStatus = null
            }, 500)
          }
        }
      } else if(this.step ===2) {
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
            this.saveNew()
            
          }, 500)
        }
      }
      
    },
    submitDialog() {
      this.eventsData= {
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
      this.titleDialog = 'New Event'
      this.dialog = true
    },
    saveNew() {
      let vm = this
      var newPostKey = firebase.database().ref().child('accountUser/').push().key;
      var storageRef = firebase.storage().ref();
  
        var adddata = firebase.database().ref().child('accountUser/'+newPostKey)
        adddata.set({
          keyIndex: newPostKey,
          backgroundPic: 'https://img.icons8.com/color/1600/000000/gender-neutral-user.png',
          idnumber: vm.eventsData.idnumber,
          fullname: _.capitalize(vm.eventsData.firstname) + ' '+ _.capitalize(vm.eventsData.lastname) + ' ' + _.capitalize(vm.eventsData.yeargrad) + ' ' + _.capitalize(vm.eventsData.college),
          firstname: _.capitalize(vm.eventsData.firstname),
          middlename: _.capitalize(vm.eventsData.firstname),
          lastname: _.capitalize(vm.eventsData.lastname),
          password: _.capitalize(vm.eventsData.password),
          yeargrad: _.capitalize(vm.eventsData.yeargrad),
          college: _.capitalize(vm.eventsData.college),
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
        })
        vm.image = ''
        vm.dialog=false
        vm.snackbar= true
        vm.submitStatus = null
        vm.step = 1

        vm.eventsData={
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
        }
       
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

<style>

</style>
