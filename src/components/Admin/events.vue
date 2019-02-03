<template>
  <v-container grid-list-lg>
    <v-layout row wrap >
    <v-flex xs12>
      <v-card width="100%" class="px-4 py-2" >
        <v-layout align-center row wrap>
          <h6 class="px2 py-3 title"> List of Events </h6>
        <v-spacer></v-spacer>
        <v-btn @click="submitDialog" v-if="admin" class="pa-0 ma-0 textNone" color="red darken-3" flat dark>New Event</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex v-if="listofEvents.length == 0">
      <v-layout class=" subheading mt-5" justify-center="" row wrap>
        No event found
      </v-layout>
    </v-flex>
   
    <v-flex class="mb-2" xs12 v-for="event in listofEvents" :key="event.id" >
      <v-card >
        <v-layout row wrap>
          <v-flex xs12 md3 class="px-1" >
          <v-img
            v-if="event.backgroundPic != ''"
            style="border-radius:3px"
            :src="event.backgroundPic"
            height="100px"
          >
          </v-img>
          <v-img
            v-else  
            style="border-radius:3px"
            src="https://cdn.pixabay.com/photo/2016/10/16/21/13/workshop-1746275_960_720.jpg"
            height="100px"
          >
          </v-img>
          </v-flex>
          <v-flex xs12 md9>
          <v-card-title primary-title>
            <div>
              <div class="headline red--text text--darken-4">{{event.title}}</div>
              <span class="grey--text">{{event.dateInfo}}</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn v-if="admin" icon @click="editData(event)">
              <v-icon style="font-size:15px" class="grey--text">edit</v-icon>
            </v-btn>
            <v-btn v-if="admin" icon @click="deleteData(event)" >
              <v-icon style="font-size:17px" class="grey--text">close</v-icon>
            </v-btn>
 
          </v-card-title>
          <v-slide-y-transition>
            <v-card-text >
              {{event.details}}
            </v-card-text>
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
      persistent=""
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
              <v-flex xs12>
                  <div v-if="!image">
                    <h2>Event Picture</h2>
                    <input  accept="image/*"  type="file" @change="onFileChange">
                  </div>
                  <div v-else>
                    <v-avatar tile color="blue lighten-5" size="100">
                      <img class="pa-1" :src="image" />
                    </v-avatar>
                    <v-btn  class="caption textNone" flat ml-2 @click="removeImage">Remove image</v-btn>
                  </div>
                </v-flex>
              <v-flex xs12  >
                <v-text-field label="Title "
                  color="red darken-2"
                  v-model="eventsData.title"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12  >
                <v-text-field label="Time Information "
                  color="red darken-2"
                  v-model="eventsData.dateInfo"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12  >
                <v-textarea label="Details "
                  color="red darken-2"
                  v-model="eventsData.details"
                  auto-grow
                  required>
                </v-textarea>
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
             

              <!-- <v-flex xs12 lg6>
                <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    full-width
                    color="red darken-2"
                    max-width="290"
                  >
                    <v-text-field
                      color="red darken-2"
                      slot="activator"
                      :value="computedDateFormattedMomentjs"
                      clearable
                      label="Date"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      v-model="date"
                      @change="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex> -->
            </v-layout>
          </v-container>
         </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            v-if="titleDialog == 'New Event'"
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
      Successfully Added Event
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
      Successfully Deleted Event
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
      Successfully Updated Event
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
      dateInfo: {required},
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
        title: '',
        dateInfo: '',
        keyIndex: '', 
        details: '',
      },
      submitStatus: null,
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
      titleDialog: ''
    }
  },
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    listofEvents () {
      var data1 = this.$store.getters.listofEvents
      var data = _.filter(data1,'title')
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
    editData(data) {
      this.eventsData= {
        backgroundPic: data.backgroundPic,
        title: data.title,
        dateInfo: data.dateInfo,
        keyIndex: data.keyIndex, 
        details: data.details,
      }
      this.image = data.backgroundPic
      this.dialog = true
      this.titleDialog = 'Edit Event'
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
          this.snackbar3= true
          this.submitStatus = null
        }, 500)
      }
    },
    editEvent() {
      let vm = this
      var newPostKey = vm.eventsData.keyIndex
      var storageRef = firebase.storage().ref();

      if(vm.image !=  this.eventsData.backgroundPic) {
          var uploadTask = storageRef.child(`eventsImages/` + newPostKey).putString(vm.image, 'data_url')
          uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
          }, function(error) {
          }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              vm.eventsData.backgroundPic = downloadURL
              var adddata = firebase.database().ref().child('Events/'+newPostKey)
              adddata.update({
                backgroundPic: vm.eventsData.backgroundPic,
                title: _.capitalize(vm.eventsData.title),
                dateInfo:  _.capitalize(vm.eventsData.dateInfo),
                keyIndex: newPostKey,
                details:  _.capitalize(vm.eventsData.details),
              })
              vm.eventsData={
                title: '',
                dateInfo: '',
                keyIndex: '', 
                details: '',
              }
              vm.image = ''
              vm.dialog=false
            })
          })
      } else {
        var adddata = firebase.database().ref().child('Events/'+newPostKey)
        adddata.update({
          backgroundPic: vm.image,
           title: _.capitalize(vm.eventsData.title),
          dateInfo:  _.capitalize(vm.eventsData.dateInfo),
          keyIndex: newPostKey,
          details:  _.capitalize(vm.eventsData.details),
        })
        vm.eventsData={
          title: '',
          dateInfo: '',
          keyIndex: '', 
          details: '',
        }
        vm.image = ''
        vm.dialog=false
      }
    },
    submitDialog() {
      this.eventsData= {
        backgroundPic:'',
        title: '',
        dateInfo: '',
        keyIndex: '', 
        details: '',
      },
      this.titleDialog = 'New Event'
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
    deleteData(data) {
      let vm = this
      firebase.database().ref().child('Events/'+data.keyIndex).remove()
      this.snackbar2 = true
    },
    saveNew() {
      let vm = this
      var newPostKey = firebase.database().ref().child('accountUser').push().key;
      var storageRef = firebase.storage().ref();

      if(vm.image != '') {
          var uploadTask = storageRef.child(`eventsImages/` + newPostKey).putString(vm.image, 'data_url')
          uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
          }, function(error) {
          }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              vm.eventsData.backgroundPic = downloadURL
              var adddata = firebase.database().ref().child('Events/'+newPostKey)
              adddata.set({
                backgroundPic: vm.eventsData.backgroundPic,
                title: _.capitalize(vm.eventsData.title),
                dateInfo:  _.capitalize(vm.eventsData.dateInfo),
                keyIndex: newPostKey,
                details:  _.capitalize(vm.eventsData.details),
              })
              vm.eventsData={
                title: '',
                dateInfo: '',
                keyIndex: '', 
                details: '',
              }
              vm.image = ''
              vm.dialog=false
            })
          })
      } else {
        var adddata = firebase.database().ref().child('Events/'+newPostKey)
        adddata.set({
          backgroundPic: vm.image,
           title: _.capitalize(vm.eventsData.title),
          dateInfo:  _.capitalize(vm.eventsData.dateInfo),
          keyIndex: newPostKey,
          details:  _.capitalize(vm.eventsData.details),
        })
        vm.eventsData={
          title: '',
          dateInfo: '',
          keyIndex: '', 
          details: '',
        }
        vm.image = ''
        vm.dialog=false
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
