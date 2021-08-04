import Home from '../views/Home';
import Detail from '../views/Detail';
import Img from '../views/Img';

const config = {
    routes: [{
        path: '/home',
        component: Home
    }, {
        path: '/detail/:id?',
        component: Detail
    }, {
        path: '/img/:id?',
        component: Img
    }, {
        from: '/',
        to: '/home'
    }]
}

export default config;