import Vue from 'vue'
import Router from 'vue-router'

// import ToDoList from '../components/ToDoList/todolist'
import signIn from '../components/signIn/signIn'

Vue.use(Router);

let router = new Router({
    routes:[
        {
            path:'/contact',
            name: 'contact',
            // component: ToDoList
        },
        {
            path: '/login',
            name: 'login',
            component: signIn,
        }
    ]
});

router.push({ path: '/login' })
export default router