
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import firebase from 'firebase'

import lost from './views/404.vue'
import Login from './views/Login.vue'
import Dash from './views/Dash.vue'

import Admin from './views/admin.vue'
import Events from './components/Admin/events.vue'
import Gallery from './components/Admin/gallery.vue'
import Announcement from './components/Admin/announcement.vue'
import Account from './components/Admin/accounts.vue'
import Profile from './components/Admin/profile.vue'
import Msu from './components/Admin/msu.vue'



Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      name: 'login',
      component: Login,
      meta: {
        requrestGuest: true
      }
    }, {
      path: '*',
      component: lost
    }, {
      path: '/',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/Events',
          component: Events,
        },
        {
          path: '/Gallery',
          component: Gallery,
        },
        {
          path: '/Announcement',
          component: Announcement,
        },
        {
          path: '/Accounts',
          component: Account,
        },
        {
          path: '/Msu',
          component: Msu,
        },
        {
          path: '/Profile',
          component: Profile,
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // const currentUser = localStorage.getItem('accountDetails').currentUser;
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const accountDetails = localStorage.getItem('accountDetails')
  var objAccount = JSON.parse(accountDetails);
  if(objAccount) {
    var type = objAccount.type
  } else {
    var type = 0
  }
  if (requiresAuth && !accountDetails) {
    next({
      path: '/auth',
      query: { redirect: to.fullPath }
    })
  } else if (to.path == '/auth' && accountDetails) {
    next('/')
  } else {
    next() // make sure to always call next()!
    if(type === 1) {
      //admin
		// console.log('TCL: accountDetails', type , 1)
      if(to.path == '/Events') {
        next('/Events')
      } else if(to.path == '/Announcement') {
        next('/Announcement')
      } else if(to.path == '/Gallery') {
        next('/Gallery')
      } else if(to.path == '/Accounts') {
        next('/Accounts')
      } else if(to.path == '/Msu') {
        next('/Msu')
      } else {
        next({
          path: '/Events',
          query: { redirect: to.fullPath }
        })
      }
    } 
    else {
      next('/')
    }
  }
});

export default router;


// if(requiresAuth) {
//   if(!accountDetails) {
//     next({
//       path: '/auth',
//       query: {
//         redirect: to.fullPath
//       }
//     })
//     console.log(firebase.auth().currentUser)
//   } else {
//     next()
//   }
// } else if(requiresGuest) {
//   if(accountDetails) {
//     next({
//       path: '/',
//       query: {
//         redirect: to.fullPath
//       }
//     })
//   } else {
//     next()
//   }