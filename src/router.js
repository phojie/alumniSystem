
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import firebase from 'firebase'

import lost from './views/404.vue'
import Login from './views/Login.vue'
// import Dash from './views/Dash.vue'
// import Admin from './views/admin.vue'
import Events from './components/Admin/events.vue'
import Gallery from './components/Admin/gallery.vue'
import Announcement from './components/Admin/announcement.vue'
import Account from './components/Admin/accounts.vue'
import Profile from './components/Admin/profile.vue'
import Msu from './components/Admin/msu.vue'

import User from './views/user.vue'




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
      component: User,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/Events',
          component: Events,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/Gallery',
          component: Gallery,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/Announcement',
          component: Announcement,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/Accounts',
          component: Account,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/Msu',
          component: Msu,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/Profile',
          component: Profile,
          meta: {
            requiresAuth: true
          },
        }
      ]
    }, 
    
  ]
})

router.beforeEach((to, from, next) => {
  // const currentUser = localStorage.getItem('accountDetails').currentUser;
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); //user
  // const requires1Auth = to.matched.some(record => record.meta.requires1Auth); //admin

  const accountDetails = localStorage.getItem('accountDetails')
  var objAccount = JSON.parse(accountDetails);
  if (requiresAuth && !accountDetails  ) {
    next({
      path: '/auth',
      query: { redirect: to.fullPath }
    })
  } else if (to.path == '/auth' && accountDetails) {
    next('/Events') 
  } else {
    // console.log(objAccount)
    next() // make sure to always call next()!
    if (to.path == '/' && accountDetails) {
      next('/Events') 
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