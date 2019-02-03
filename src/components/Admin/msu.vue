<template>
  <v-container grid-list-lg>
    <v-layout row wrap >
    <v-flex xs12>
      <v-card width="100%" class="pa-4" >
        <v-layout align-center row wrap>
          <h6 class="title"> School Information </h6>
        <v-spacer></v-spacer>
        <!-- <v-btn @click="submitDialog" class=" textNone" color="red darken-3" flat dark>New Announcement</v-btn> -->
        </v-layout>
      </v-card>
    </v-flex>
   
    <v-flex v-for="(info, index) in listofInfo" :key="index" md6 xs12 class="my-3">
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 >
            <v-layout  row wrap>
              <v-flex  xs10>
                <v-card-title primary-title>
                  <div >
                    <div  class="headline red--text text--darken-4">{{info.title}}</div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs2 class="">
                <v-layout row wrap>
                   <v-btn icon @click="editData(info)">
                    <v-icon style="font-size:15px" class="grey--text">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteData(info)" >
                    <v-icon style="font-size:17px" class="grey--text">close</v-icon>
                  </v-btn>
                  </v-layout>
                </v-flex>
            </v-layout>
          <v-slide-y-transition>
            <v-card-text v-if="info.details.email == null" >
              {{info.details}}
            </v-card-text>
            <span v-else>
              <v-card-text>
                {{info.details.details}}
              </v-card-text>
              <v-list class="transparent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="red--text text--lighten-2">phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{info.details.cnumber}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="red--text text--lighten-2">place</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{info.details.location}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon
                    class="red--text text--lighten-2">email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{info.details.email}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              </span>
          </v-slide-y-transition>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    
    </v-layout>
  

    <!-- dialog -->
    <v-dialog
      v-model="dialog"
      width="600"
    >

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
        {{titleDialog}}
        </v-card-title>

      <v-progress-linear v-if="submitStatus == 'Loading...'" :indeterminate="true"></v-progress-linear>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex v-if="eventsData.email == null">
                <v-flex xs12  >
                  <v-textarea label="Details "
                    color="red darken-2"
                    v-model="eventsData.details"
                    auto-grow
                    required>
                  </v-textarea>
                </v-flex>
              </v-flex>
              <v-flex v-else>
                <v-flex xs12  >
                  <v-textarea label="Details "
                    color="red darken-2"
                    v-model="eventsData.details.details"
                    auto-grow
                    required>
                  </v-textarea>
                </v-flex>
                <v-flex xs12  >
                  <v-text-field label="Email "
                    color="red darken-2"
                    v-model="eventsData.details.email"
                    required></v-text-field>
                </v-flex>
                <v-flex xs12  >
                  <v-text-field label="Contact number"
                    color="red darken-2"
                    v-model="eventsData.details.cnumber"
                    required></v-text-field>
                </v-flex>
                <v-flex xs12  >
                  <v-text-field label="Location "
                    color="red darken-2"
                    v-model="eventsData.details.location"
                    required></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex xs12 >
                <v-card
                  v-show="submitStatus != ''"
                  flat
                >
                <span v-if="submitStatus == 'All field is required*'" class="red--text subheading">{{submitStatus}}</span> 
                <span v-else-if="submitStatus == 'Loading...'" class="amber--text subheading">{{submitStatus}}</span> 
                <span v-else class="green--text subheading">{{submitStatus}}</span> 

                </v-card>
              </v-flex>

            </v-layout>
          </v-container>
         </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="titleDialog == 'New Announcement'"
            color="success"
            flat
            @click="submit"
          >
            Save
          </v-btn>

          <v-btn
            v-else
            color="success"
            flat
            @click="submitEdit"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
    >
      Successfully Added Announcement
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
      Successfully Deleted Announcement
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
      Successfully Updated Information
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
      title: {required},
      details: {required},
    },
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      dialog: false,
      show: false,
      image: '',
      eventsData: {
        backgroundPic:'',
        dateInfo: '',
        keyIndex: '', 
        details: '',
        title: '',
        email: '',
        details2: '',
        location: '',
        cnumber: '',
      },
      submitStatus: '',
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
      titleDialog: '',
    }
  },
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    listofInfo() {
      var data1 = this.$store.getters.listofInfo
      var data = _.filter(data1,'title')
      return data
    }
  },
  methods: {
    editData(data) {
      this.eventsData= {
        title: data.title,
        keyIndex: data.keyIndex, 
        details: data.details,
        email: data.details.email,
        details2: data.details.details,
        location: data.location,
        cnumber: data.cnumber,
      }
      this.dialog = true
      this.titleDialog = data.title
    },
    submitEdit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'All field is required*'
      } else {
        // do your submit logic here
        this.submitStatus = 'Loading...'
        setTimeout(() => {
          this.editEvent()
        }, 500)
      }
    },
    editEvent() {
      let vm = this
      var newPostKey = vm.eventsData.keyIndex
			// console.log('TCL: editEvent -> vm.eventsData.keyIndex', vm.eventsData.keyIndex)
      var adddata = firebase.database().ref().child('schoolInfo/'+newPostKey)
      if(vm.eventsData.email == null) {
        adddata.update({
          title: _.capitalize(vm.eventsData.title),
          keyIndex: newPostKey,
          details:_.capitalize(vm.eventsData.details),
        })
      } else {
        adddata.update({
          title: _.capitalize(vm.eventsData.title),
          keyIndex: newPostKey,
          details: {
            cnumber: _.capitalize(vm.eventsData.details.cnumber),
            details: _.capitalize(vm.eventsData.details.details),
            location: _.capitalize(vm.eventsData.details.location),
            email: _.capitalize(vm.eventsData.details.email)
          },
        })
      }
     
      vm.eventsData={
        title: '',
        dateInfo: '',
        keyIndex: '', 
        details: '',
      }
      vm.snackbar3= true
      vm.submitStatus = null
      vm.dialog=false
    },
    deleteData(data) {
      let vm = this
      firebase.database().ref().child('announcement/'+data.keyIndex).remove()
      this.snackbar2 = true
    },
    submitDialog() {
      this.eventsData= {
        backgroundPic:'',
        title: '',
        dateInfo: '',
        keyIndex: '', 
        details: '',
      },
      this.titleDialog = 'New Announcement'
      this.dialog = true
    },
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'All field is required*'
      } else {
        // do your submit logic here
        this.submitStatus = 'Loading...'
        setTimeout(() => {
          this.saveNew()
          this.snackbar= true
          this.submitStatus = null
        }, 500)
      }
    },
    saveNew() {
      let vm = this
      var newPostKey = firebase.database().ref().child('announcement').push().key;
      var adddata = firebase.database().ref().child('announcement/'+newPostKey)
      adddata.set({
        title: _.capitalize(vm.eventsData.title),
        keyIndex: newPostKey,
        details:_.capitalize(vm.eventsData.details),
      })
      vm.eventsData={
        title: '',
        dateInfo: '',
        keyIndex: '', 
        details: '',
      }
      vm.dialog=false
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
