import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Purchase from '../views/Purchase'
import PurchaseResult from '../views/PurchaseResult'
import Login from '../views/Login'
import Support from '../views/Support'
import Account from '../views/Account'
import Pkg from '../views/Pkg'
import Scenario from '../views/Scenario'

import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Home},
    {path: '/purchase', component: Purchase},
    {path: '/purchase/:result', component: PurchaseResult},
    {path: '/support', component: Support},
    {path: '/login', component: Login},

    {
        path: "/a/:accountName",
        component: Account,
        meta: {requiresAuth: true},

    },
    {
        path: "/a/:accountName/:pkgId",
        component: Pkg,
        meta: {requiresAuth: true},

    },
    {
        path: "/a/:userId/:pkgId/:scenarioId",
        component: Scenario,
        meta: {requiresAuth: true},
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            store.dispatch("loginDemo")
                .then(resp => {
                    next()
                })
        }
        else {
            next()
        }
    }
    else { // no auth required
        store.commit('clearPkg')
        next()
    }
})


//   if (store.getters.isLoggedIn) {
//     next()
//   }
//   else {
//       next('/')
//   }
// } else {
//   next()
// }
// })

export default router
