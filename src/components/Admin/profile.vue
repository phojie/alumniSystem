<template>
  <v-container grid-list-lg>
    <v-layout row wrap >
    <v-flex xs12>
      <v-card width="100%" class="px-4 py-2" >
        <v-layout align-center row wrap>
          <h6 class="title"> List of Events </h6>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = true" class=" textNone" color="red darken-3" flat dark>New Event</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12 >
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 md3 class="px-1" >
          <v-img
            style="border-radius:3px"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          >
          </v-img>
          </v-flex>
          <v-flex xs12 md9>
          <v-card-title primary-title>
            <div>
              <div class="headline red--text text--darken-4">Top western road trips</div>
              <span class="grey--text">1,000 miles of wonder</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn icon >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon >
              <v-icon>close</v-icon>
            </v-btn>
 
          </v-card-title>
          <v-slide-y-transition>
            <v-card-text >
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
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
          New Event
        </v-card-title>

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
            @click="saveNew"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase';

export default {
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
    }
  },
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
  },
  methods: {
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
                title: vm.eventsData.title,
                dateInfo: vm.eventsData.dateInfo,
                keyIndex: newPostKey,
                details: vm.eventsData.details,
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
          title: vm.eventsData.title,
          dateInfo: vm.eventsData.dateInfo,
          keyIndex: newPostKey,
          details: vm.eventsData.details,
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
