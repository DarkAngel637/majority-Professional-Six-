import Home from '../views/Home';

export default {
    routes: [{
        path: '/home',
        component: Home
    }, {
        from: '/',
        to: '/home'
    }]
}