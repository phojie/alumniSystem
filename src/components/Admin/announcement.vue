<template>
  <v-container grid-list-lg>
    <v-layout row wrap >
    <v-flex xs12>
      <v-card width="100%" class="px-4 py-2" >
        <v-layout align-center row wrap>
          <h6 class="px-2 py-3 title"> List of Announcements </h6>
        <v-spacer></v-spacer>
        <v-btn @click="submitDialog" v-if="admin" class="ma-0 pa-0 textNone" color="red darken-3" flat dark>New Announcement</v-btn>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex v-if="listofAnnounce.length == 0">
      <v-layout class=" subheading mt-5" justify-center="" row wrap>
        No announcement found
      </v-layout>
    </v-flex>
   
    <v-flex xs4 v-for="(announce, index) in listofAnnounce" :key="index" >
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 >
            <v-layout  row wrap>
              <v-flex  xs10>
                <v-card-title primary-title>
                  <div >
                    <div  class="headline red--text text--darken-4">{{announce.title}}</div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs2 class="">
                <v-layout  v-if="admin" row wrap>
                   <v-btn icon @click="editData(announce)">
                    <v-icon style="font-size:15px" class="grey--text">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteData(announce)" >
                    <v-icon style="font-size:17px" class="grey--text">close</v-icon>
                  </v-btn>
                  </v-layout>
                </v-flex>
            </v-layout>
          <v-slide-y-transition>
            <v-card-text >
              {{announce.details}}
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
              <v-flex xs12  >
                <v-text-field label="Title "
                  color="red darken-2"
                  v-model="eventsData.title"
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
              {{submitStatus}}
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
      Successfully Updated Announcement
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
        title: '',
        dateInfo: '',
        keyIndex: '', 
        details: '',
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
    listofAnnounce() {
      var data1 = this.$store.getters.listofAnnouncement
      var data = _.filter(data1,'title')
			// console.log('TCL: listofAnnounce -> data', data)
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
        title: data.title,
        keyIndex: data.keyIndex, 
        details: data.details,
      }
      this.dialog = true
      this.titleDialog = 'Edit Announcement'
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
      var adddata = firebase.database().ref().child('announcement/'+newPostKey)
      adddata.update({
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
