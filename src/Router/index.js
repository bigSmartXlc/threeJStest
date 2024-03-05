import {createRouter, createWebHashHistory,createWebHistory} from 'vue-router';
import {dynamicRoutes} from './route.js';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';
export const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes: dynamicRoutes,
});

// // 路由加载前
// router.beforeEach(async (to, from, next) => {
//     NProgress.configure({showSpinner: false});
//     if (to.meta.title) NProgress.start();
//     const token = Session.get('token');
//     if (to.path === '/login' && !token) {
//         next();
//         NProgress.done();
//     } else {
//         if (!token) {
//             next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
//             Session.clear();
//             NProgress.done();
//         } else if (token && to.path === '/login') {
//             next('/home');
//             NProgress.done();
//         } else {
//             const storesRoutesList = useRoutesList(pinia);
//             const {routesList} = storeToRefs(storesRoutesList);
//             if (routesList.value.length === 0) {
//                 if (isRequestRoutes) {
//                     // 后端控制路由：路由数据初始化，防止刷新时丢失
//                     await initBackEndControlRoutes();
//                     // 动态添加路由：防止非首页刷新时跳转回首页的问题
//                     // 确保 addRoute() 时动态添加的路由已经被完全加载上去
//                     next({...to, replace: true});
//                 } else {
//                     // https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
//                     await initFrontEndControlRoutes();
//                     next({...to, replace: true});
//                 }
//             } else {
//                 next();
//             }
//         }
//     }
// });

// // 路由加载后
// router.afterEach(() => {
//     NProgress.done();
// });

// 导出路由
export default router;