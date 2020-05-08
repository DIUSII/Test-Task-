import Vue from 'vue'
import Router from 'vue-router'

import contact from '../components/contact/contact'
import signIn from '../components/signIn/signIn'

Vue.use(Router);

let router = new Router({
    routes:[
        {
            path:'/contact',
            name: 'contact',
            component: contact
        },
        {
            path: '/login',
            name: 'login',
            component: signIn,
        }
    ]
});
if(localStorage.signin === undefined){
    router.push({ path: '/login' })
} else {
    router.push({ path: '/contact' })
}

export default router