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
        name: 'about',
        component: () => import('@/views/About/'),
        meta: {
            title: '关于我们',
            main: false
        }
    },
    {
        name: 'created-activity',
        component: () => import('@/views/CreatedActivity/'),
        meta: {
            title: '创建的活动',
            main: false
        }
    },
    {
        name: 'joined-activity',
        component: () => import('@/views/JoinedActivity/'),
        meta: {
            title: '参与的活动',
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
            if (to.query.op === 0) {
                next({path: '/mine'})
            } else {
                next();
            }
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
    const title = to.meta && to.meta.title;
    const main = to.meta && to.meta.main;
    document.title = `${title ? title : '首页'} - 苏大易表单`;
    store.commit(types.CHANGE_PAGE_TYPE, !!main);
    next();
});

export default router;
