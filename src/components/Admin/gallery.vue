<template>
  <v-container grid-list-lg>
    <v-layout row wrap >
    <v-flex xs12>
      <v-card width="100%" class="px-4 py-2" >
        <v-layout align-center row wrap>
          <h6 class="px-2 py-3 title"> Gallery </h6>
        <v-spacer></v-spacer>
        <v-btn @click="newAlbum" v-if="admin" class="ma-0 pa-0 textNone" color="red darken-3" flat dark>Add album</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12>
    <v-data-table
      :headers="headers"
      :items="listofAlbum"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="">{{ props.item.details }}</td>
        <td class=" ">
          <v-icon
            small
            class="mr-2"
            @click="viewItem(props.item)"
          >
            mdi-view-grid
          </v-icon>
          <v-icon
          v-if="admin"
            small
            class="mr-2"
            @click="editItem(props.item)"
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
    </v-data-table>
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
          {{dialogTitle}}
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

              <v-flex xs12>
                <h2>Add photos</h2>
                <input class="ma-4" accept="image/*" multiple type="file" @change="onFileChange">
                <v-layout row wrap>
                  <div v-for="(img, index) in listofImagesA" :key="index" >
                    <v-avatar tile color="blue lighten-5" size="100">
                      <img class="pa-1" :src="img" />
                    </v-avatar>
                    <v-btn icon style="margin-left:-30px;margin-top:-5px;position:absolute" small color="grey lighten-3" @click="removeCurrentImg(img, index)">
                      <v-icon style="font-size:18px" color="red darken-3">close</v-icon>
                    </v-btn>
                  </div>
                </v-layout>
              </v-flex>

              

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
            color="success"
            flat
            v-if="dialogTitle === 'New Album'"
            @click="submit"
          >
            Save
          </v-btn>
           <v-btn
            color="success"
            flat
            v-else
            @click="submitEdit"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-dialog
      v-model="dialog3"
      max-width="290"
    >
      <v-card>
        <v-card-title class="subheading">Are you sure you want to delete this album</v-card-title>

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
      v-model="dialog2"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{eventsData.title}}
        </v-card-title>

        <v-card-text>
          {{eventsData.details}}
        </v-card-text>

         <v-flex xs12>
          <v-card>
            <v-container grid-list-sm fluid>
              <v-layout row wrap>
                <v-flex
                  v-for="(img, index) in eventsData.backgroundPic"
                  :key="index"
                  xs4
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

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog2 = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
    >
      Successfully Added an Album
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
      Successfully deleted an Album
      <v-btn
        color="pink"
        flat
        @click="snackbar2 = false"
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
      imagesDataAlbum: [],
      eventsData: {
        backgroundPic:[],
        title: '',
        dateInfo: '',
        keyIndex: '', 
        details: '',
      },
      imgsTest: [],
      submitStatus: null,
      snackbar: false,
      snackbar2: false, 
      dialog2: false,
      dialog3: false,
      dialogTitle: '',
      listofDeleted: [],
      saveAlbumimgs: [],

      headers: [
        {
          text: 'Album Title',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Details', value: 'details' },
        { text: 'Actions', value: 'title', sortable: false, }
      ],
    }
  },
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    listofImagesA () {
      // console.log('TCL: listofImagesA -> this.imagesDataAlbum', this.imagesDataAlbum)
      // var data = _.union([this.saveAlbumimgs],[this.imagesDataAlbum])
      var data = this.imagesDataAlbum
      return data
    },
    listofAlbum () {
      var data = _.filter(this.$store.getters.listofAlbum, 'keyIndex')
      return data
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
    submitEdit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'All field is required*'
      } else {
        // do your submit logic here
        this.submitStatus = 'Loading...'
        setTimeout(() => {
          this.editNow()
        }, 500)
      }
    },
    editNow() {
      let vm = this
      var newPostKey = vm.eventsData.keyIndex
      var storageRef = firebase.storage().ref();
      var itemsProcessed = 0;
      var itemsProcessed2 = 0;
      // console.log(this.listofImagesA.length)
      submitjie()
      function submitjie() {
        if(vm.listofImagesA.length != 0) {
            _.forEach(vm.listofImagesA, function(value, key) {
              ValidURL(value, key)
              function ValidURL(value, key) {
                var pattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");
                if(!pattern.test(value)) {
        
                  var uploadTask = storageRef.child(`albumPhotos/${newPostKey}/${key}`).putString(value, 'data_url')
                  uploadTask.on('state_changed', function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  }, function(error) {

                  }, function () {
                      uploadTask.snapshot.ref.getDownloadURL().then( function(downloadURL) {
                      vm.imgsTest.push(downloadURL)
                      var adddata = firebase.database().ref().child('albumPhotos/'+newPostKey)
                      adddata.update({
                        backgroundPic: vm.imgsTest,
                        title: _.capitalize(vm.eventsData.title),
                        keyIndex: newPostKey,
                        details: _.capitalize(vm.eventsData.details),
                      })

                      itemsProcessed++;
                      if(itemsProcessed === vm.listofImagesA.length) {
                        donejie();
                      }
                    })
                  })

                } else {
                  var deletedTrue = _.filter(vm.listofDeleted, value)
                  if (deletedTrue.length === 0) {
                    var downloadURL = value
                    vm.imgsTest.push(downloadURL)
                    var adddata = firebase.database().ref().child('albumPhotos/'+newPostKey)
                    adddata.update({
                      backgroundPic: vm.imgsTest,
                      title: _.capitalize(vm.eventsData.title),
                      keyIndex: newPostKey,
                      details: _.capitalize(vm.eventsData.details),
                    })
                    itemsProcessed++;
                    if(itemsProcessed === vm.listofImagesA.length) {
                      donejie();
                    }
                  } else {
                    itemsProcessed++;
                    if(itemsProcessed === vm.listofImagesA.length) {
                      donejie();
                    }
                  }
                  //close if
                }
                  //end if
              }


              

            })

            function donejie() {
              vm.eventsData={
                title: '',
                dateInfo: '',
                keyIndex: '', 
                details: '',
              }
              vm.imagesDataAlbum = []
              vm.dialog=false
              vm.submitStatus = null
              vm.snackbar= true

            }

          

        } else {
          var adddata = firebase.database().ref().child('albumPhotos/'+newPostKey)
          adddata.update({
            // photos:,
            title: _.capitalize(vm.eventsData.title),
            keyIndex: newPostKey,
            details: _.capitalize(vm.eventsData.details),
          })
          vm.eventsData={
            title: '',
            dateInfo: '',
            keyIndex: '', 
            details: '',
          }
          vm.imagesDataAlbum = []
          vm.dialog=false
          vm.submitStatus = null
          vm.snackbar= true
        }
      }
    },
    editItem(data) {
      this.eventsData= {
        backgroundPic: data.backgroundPic,
        title: data.title,
        keyIndex: data.keyIndex, 
        details: data.details,
      }
      this.imagesDataAlbum = data.backgroundPic
      this.dialog = true
      this.dialogTitle = 'Edit Album'
    },
    deleteNow(){
      // var storageRef = firebase.storage().ref();

      // var albumStorage = storageRef.child(`albumPhotos/${this.eventsData.keyIndex}`)

      // albumStorage.delete().then(function() {
        // File deleted successfully
        firebase.database().ref().child('albumPhotos/'+this.eventsData.keyIndex).remove()
        this.dialog3 = false
        this.snackbar2 = true
        // console.log('file deleted')
      // }).catch(function(error) {
        // console.log(error)
        // Uh-oh, an error occurred!
      // });
    },
    deleteItem(data) {
      this.eventsData= {
        backgroundPic: data.backgroundPic,
        title: data.title,
        keyIndex: data.keyIndex, 
        details: data.details,
      }
      this.dialog3 = true
    },
    viewItem(data) {
      this.eventsData= {
        backgroundPic: data.backgroundPic,
        title: data.title,
        keyIndex: data.keyIndex, 
        details: data.details,
      }
      this.dialog2 = true
    },
    newAlbum() {
      this.eventsData= {
        backgroundPic: '',
        title:'',
        keyIndex:'', 
        details: '',
      }
      this.imagesDataAlbum = []
      this.saveAlbumimgs = []
      this.dialog = true
      this.dialogTitle = 'New Album'
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
        }, 500)
      }
    },
    saveNew() {
      let vm = this
      var newPostKey = firebase.database().ref().child('albumName').push().key;
      var storageRef = firebase.storage().ref();
      var itemsProcessed = 0;
      if(vm.listofImagesA.length != 0) {
          _.forEach(vm.listofImagesA, function(value, key) {
           
            var uploadTask = storageRef.child(`albumPhotos/${newPostKey}/${key}`).putString(value, 'data_url')
            uploadTask.on('state_changed', function(snapshot){
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, function(error) {
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then( function(downloadURL) {
                vm.imgsTest.push(downloadURL)
                var adddata = firebase.database().ref().child('albumPhotos/'+newPostKey)
                adddata.set({
                  backgroundPic: vm.imgsTest,
                  title: _.capitalize(vm.eventsData.title),
                  keyIndex: newPostKey,
                  details: _.capitalize(vm.eventsData.details),
                })

                itemsProcessed++;
                if(itemsProcessed === vm.listofImagesA.length) {
                  donejie();
                }
              
              })
            })

          })

          function donejie() {
            vm.eventsData={
              title: '',
              dateInfo: '',
              keyIndex: '', 
              details: '',
            }
            vm.imagesDataAlbum = []
            vm.dialog=false
            vm.submitStatus = null
            vm.snackbar= true

          }

         

      } else {
        var adddata = firebase.database().ref().child('albumPhotos/'+newPostKey)
        adddata.set({
          // photos:,
          title: _.capitalize(vm.eventsData.title),
          keyIndex: newPostKey,
          details: _.capitalize(vm.eventsData.details),
        })
        vm.eventsData={
          title: '',
          dateInfo: '',
          keyIndex: '', 
          details: '',
        }
        vm.imagesDataAlbum = []
        vm.dialog=false
        vm.submitStatus = null
        vm.snackbar= true
      }
     
    },
    onFileChange(e) {
      var vm = this
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      _.forEach(files, function(value, key) {
        vm.createImage(files[key]);
      })
    },
    createImage(file) {  
      // console.log(file) 
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        vm.imagesDataAlbum.push(vm.image)
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = ''
    },
    removeCurrentImg(img, index) {
			// console.log('TCL: removeCurrentImg -> index', index)
      this.listofImagesA.splice(index,1);
      this.listofDeleted.push(img)
    }
  }
}
</script>

<style>

</style>
