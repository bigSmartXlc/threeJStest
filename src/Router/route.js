
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink: 链接地址不为空`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
 *      roles：         当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes = [
	{
		path: '/',
		name: '/',
		component: () => import('../views/components/Basic.vue'),
		children: [],
	},
	{
		path: '/material',
		name: 'material',
		component: () => import('../views/components/material.vue'),
		children: [],
	},
	{
		path: '/textures',
		name: 'textures',
		component: () => import('../views/components/textures.vue'),
		children: [],
	},
	{
		path: '/standatd_material',
		name: 'standatd_material',
		component: () => import('../views/components/standatd_material.vue'),
		children: [],
	},
	{
		path: '/cube_textures',
		name: 'cube_textures',
		component: () => import('../views/components/cube_textures.vue'),
		children: [],
	},
	{
		path: '/panorama',
		name: 'panorama',
		component: () => import('../views/components/panorama.vue'),
		children: [],
	},
	{
		path: '/hdr_textures',
		name: 'hdr_textures',
		component: () => import('../views/components/hdr_textures.vue'),
		children: [],
	},
	{
		path: '/light_shadow',
		name: 'light_shadow',
		component: () => import('../views/components/light_shadow.vue'),
		children: [],
	},
	{
		path: '/point',
		name: 'point',
		component: () => import('../views/point/point.vue'),
		children: [],
	},
	{
		path: '/points2',
		name: 'points2',
		component: () => import('../views/point/points2.vue'),
		children: [],
	},
	{
		path: '/point2star',
		name: 'point2star',
		component: () => import('../views/point/point2star.vue'),
		children: [],
	},
	{
		path: '/spot-light-shadow',
		name: 'spot-light-shadow',
		component: () => import('../views/components/spot-light-shadow.vue'),
		children: [],
	},
	{
		path: '/dynamic',
		name: 'dynamic',
		component: () => import('../views/components/dynamic.vue'),
		children: [],
	},
	{
		path: '/raycaster',
		name: 'raycaster',
		component: () => import('../views/point/raycaster.vue'),
		children: [],
	},
	{
		path: '/RapierPhysics',
		name: 'RapierPhysics',
		component: () => import('../views/ammo/RapierPhysics.vue'),
		children: [],
	},
	{
		path: '/ammo',
		name: 'ammo',
		component: () => import('../views/ammo/ammo01.vue'),
		children: [],
	},
	{
		path:'/carGame',
		name: 'carGame',
		component: () => import('../views/ammo/carGame.vue'),
		children: [],
	},
	{
		path: '/animation',
		name: 'animation',
		component: () => import('../views/point/animation.vue'),
		children: [],
	},
	{
		path: '/glb_load',
		name: 'glb_load',
		component: () => import('../views/moudle3D/glb_load.vue'),
		children: [],
	},
	{
		path: '/morgh',
		name: 'morgh',
		component: () => import('../views/moudle3D/morgh.vue'),
		children: [],
	},
	{
		path: '/dracoLoader',
		name: 'dracoLoader',
		component: () => import('../views/moudle3D/glb_dracoLoader.vue'),
		children: [],
	},
	{
		path: '/clipping',
		name: 'clipping',
		component: () => import('../views/point/clipping.vue'),
		children: [],
	},
	{
		path: '/pdb',
		name: 'pdb',
		component: () => import('../views/point/pdb.vue'),
		children: [],
	},
	{
		path: '/extrude',
		name: 'extrude',
		component: () => import('../views/point/extrude.vue'),
		children: [],
	},
	{
		path: '/textmodule',
		name: 'textmodule',
		component: () => import('../views/point/textmodule.vue'),
		children: [],
	},
	{
		path: '/shader',
		name: 'shader',
		component: () => import('../views/shaders/shader.vue'),
		children: [],
	},
	{
		path: '/boxShader',
		name: 'boxShader',
		component: () => import('../views/shaders/boxShader.vue'),
		children: [],
	},
	{
		path: '/torusShader',
		name: 'torusShader',
		component: () => import('../views/shaders/torusShader.vue'),
		children: [],
	},
	{
		path: '/shaderPass',
		name: 'shaderPass',
		component: () => import('../views/shaders/shaderPass.vue'),
		children: [],
	}
];

/** 
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
// export const notFoundAndNoPower = [
// 	{
// 		path: '/:path(.*)*',
// 		name: 'notFound',
// 		component: () => import('/@/views/system/error/404.vue'),
// 		meta: {
// 			title: 'message.staticRoutes.notFound',
// 			isHide: true,
// 		},
// 	},
// 	{
// 		path: '/401',
// 		name: 'noPower',
// 		component: () => import('/@/views/system/error/401.vue'),
// 		meta: {
// 			title: 'message.staticRoutes.noPower',
// 			isHide: true,
// 		},
// 	},
// ];

// /**
//  * 定义静态路由（默认路由）
//  * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
//  * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
//  * @returns 返回路由菜单数据
//  */
// export const staticRoutes = [
// 	{
// 		path: '/login',
// 		name: 'login',
// 		component: () => import('/@/views/system/login/index.vue'),
// 		meta: {
// 			title: '登录',
// 		},
// 	},
// ];
