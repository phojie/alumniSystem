import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accountDetails: [],
    listofEvents: [],
    listofAlbum: [],
    listofAnnouncement: [],
    listofInfo: [],
    listofAccount: [],
  },
  getters: {
    accountDetails(state) {
      return state.accountDetails
    },
    listofEvents(state) {
      return state.listofEvents
    },
    listofAlbum(state) {
      return state.listofAlbum
    },
    listofAnnouncement(state) {
      return state.listofAnnouncement
    },
    listofInfo(state) {
      return state.listofInfo
    },
    listofAccount(state) {
      return state.listofAccount
    }
  },
  mutations: {
    saveAccountDetails(state) {
      state.accountDetails = localStorage.getItem('accountDetails')
    },
    saveEvents(state,data) {
      state.listofEvents = data
    },
    saveAlbum(state,data) {
      state.listofAlbum = data
    },
    saveAnnounce(state,data) {
      state.listofAnnouncement = data
    },
    saveInfo(state,data) {
      state.listofInfo = data
    },
    saveAccount(state,data) {
      state.listofAccount = data
      
    }
  },
  actions: {
    getEvents(context, state) {
      firebase.database().ref('Events').on('value', function(snapshot) {
        context.commit('saveEvents', snapshot.val())
      })
    },
    getAlbum(context, state) {
      firebase.database().ref('albumPhotos').on('value', function(snapshot) {
        context.commit('saveAlbum', snapshot.val())
      })
    },
    getAnnounce(context, state) {
      firebase.database().ref('announcement').on('value', function(snapshot) {
        context.commit('saveAnnounce', snapshot.val())
      })
    },
    getInfo(context, state) {
      firebase.database().ref('schoolInfo').on('value', function(snapshot) {
        context.commit('saveInfo', snapshot.val())
      })
    },
    getAccount(context, state) {
      firebase.database().ref('accountUser').on('value', function(snapshot) {
        context.commit('saveAccount', snapshot.val())
      })
    }

  }
})

export default store
