import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accountDetails: []
  },
  getters: {
    accountDetails(state) {
      return state.accountDetails
    }
  },
  mutations: {
    saveAccountDetails(state) {
      state.accountDetails = localStorage.getItem('accountDetails')
    }
    
  },
  actions: {

  }
})

export default store
