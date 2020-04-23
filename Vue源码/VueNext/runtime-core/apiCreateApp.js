extends function createAppAPI(render){
    return function createApp(){
        const context = createAppContext();
        const installedPlugins = new Set(); // 安装的插件
        let isMounted = false;

        const app = {
            use(){

            },
            mixin(){

            },
            mount(){

            },
            unmount(){

            },

        };
        return app;
    }
}