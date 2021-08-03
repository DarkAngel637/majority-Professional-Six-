import Home from '../views/Home';
import Detail from '../views/Detail';

const config = {
    routes: [{
        path: '/home',
        component: Home
    }, {
        path: '/detail/:id?',
        component: Detail
    }, {
        from: '/',
        to: '/home'
    }]
}

export default config;