<template>
    <div style="position: absolute;top: 0;display: flex;flex-direction: column;z-index: 101;">
        <router-link to="/">基础</router-link>
        <router-link to="/material">材质</router-link>
        <router-link to="/textures">纹理算法</router-link>
        <router-link to="/standatd_material">金属材质</router-link>
        <router-link to="/cube_textures">环境贴图</router-link>
        <router-link to="/panorama">全景贴图</router-link>
        <router-link to="/hdr_textures">hdr贴图</router-link>
        <router-link to="/light_shadow">光照阴影</router-link>
        <router-link to="/dynamic">动态海面</router-link>
        <router-link to="/spot-light-shadow">点光源阴影</router-link>
        <router-link to="/point">点材质</router-link>
        <router-link to="/point2star">自由粒子</router-link>
        <router-link to="/points2">粒子效果</router-link>
        <router-link to="/raycaster">光线投射</router-link>
        <router-link to="/animation">关键帧动画</router-link>
        <router-link to="/glb_load">GLB模型加载</router-link>
        <router-link to="/morgh">机器人动作</router-link>
        <router-link to="/dracoLoader">东京小酒馆</router-link>
        <router-link to="/clipping">剪切</router-link>
        <router-link to="/pdb">pdb分子模型加载</router-link>
        <router-link to="/extrude">挤压物体建模</router-link>
        <router-link to="/textmodule">文本加载建模</router-link>
        <router-link to="/shader">着色器</router-link>
        <router-link to="/boxShader">着色器盒子</router-link>
        <router-link to="/torusShader">着色器圆环</router-link>
        <router-link to="/shaderPass">着色器后期处理</router-link>
        <router-link to="/RapierPhysics">物理引擎RapierPhysics</router-link>
        <router-link to="/ammo">物理引擎ammo</router-link>
        <router-link to="/carGame">开车小游戏</router-link>
    </div>
    <Suspense>
        <router-view></router-view>
    </Suspense>
</template>