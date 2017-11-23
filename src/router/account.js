import store from '@/store'

const Login = () => import('@/views/pages/auth/Login')
const Register = () => import('@/views/pages/auth/Register')
const Dashboard = () => import('@/views/pages/account/Dashboard')

export default {
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/account/dashboard',
            name: 'dashboard',
            component: Dashboard,
            beforeEnter: (to, from, next) => {
                next(store.state.auth.token ? true : {
                    path: '/login',
                    query: {
                        redirect: to.login
                    }
                })
            }
        }
    ]
}
