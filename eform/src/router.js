import Vue from 'vue'
import Router from 'vue-router'
import store from './store/'
import * as types from './store/mutation-types'
import {log} from './utils/lib'

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        component: () => import('@/views/Home/'),
        meta: {
            title: '首页',
            main: true
        },
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/HomeContent/'),
                meta: {
                    title: '首页',
                    main: true
                }
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('@/views/HomeSearch/'),
                meta: {
                    title: '搜索',
                    main: true
                }
            }
        ]
    },
    {
        name: 'mine',
        component: () => import('@/views/Mine/'),
        meta: {
            title: '个人主页',
            main: true
        }
    },
    {
        path: '/mine/:target',
        name: 'mine-data',
        component: () => import('@/views/Mine/MyList'),
        props: true,
        meta: {
            title: '',
            main: false
        }
    },
    {
        name: 'about',
        component: () => import('@/views/About/'),
        meta: {
            title: '关于我们',
            main: false
        }
    },
    {
        path: '/activity-info',
        name: 'activity-info',
        component: () => import('@/views/ActivityInfo/'),
        props: route => route.query,
        meta: {
            title: '活动信息',
            main: false
        },
        beforeEnter: (to, from, next) => {
            next();
        }
    },
    {
        path: '/activity-form',
        name: 'activity-form',
        component: () => import('@/views/ActivityForm/'),
        props: route => route.query,
        meta: {
            title: '报名表',
            main: false
        }
    }

];

routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    let title = to.meta && to.meta.title;
    if (title === '') {
        switch (to.params.target) {
            case 'event':
                title = "我发起的活动";
                break;
            case 'participate':
                title = "我报名的活动";
                break;
            case 'qnaire':
                title = "我发布的问卷";
                break;
            case 'anonymous_qnaire':
                title = "我发布的匿名问卷";
                break;
            case 'answer':
                title = "我提交的答卷";
                break;
        }
    }
    const main = to.meta && to.meta.main;
    document.title = `${title ? title : '首页'} - 苏大易表单`;
    store.commit(types.CHANGE_PAGE_TYPE, !!main);
    next();
});

export default router;
