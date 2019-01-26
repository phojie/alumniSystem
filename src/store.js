import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accountDetails: [],
    listofEvents: [],
  },
  getters: {
    accountDetails(state) {
      return state.accountDetails
    },
    listofEvents(state) {
      return state.listofEvents
    }
  },
  mutations: {
    saveAccountDetails(state) {
      state.accountDetails = localStorage.getItem('accountDetails')
    },
    saveEvents(state,data) {
      state.listofEvents = data
    }
    
  },
  actions: {
    getEvents(context, state) {
      firebase.database().ref('Events').on('value', function(snapshot) {
        context.commit('saveEvents', snapshot.val())
      })
    },

  }
})

export default store
