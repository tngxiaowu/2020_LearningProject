// 创建一个app对象 -> 
export function createAppAPI( render ){
    return function createApp( rootComponent:Component, rootProps = null){
        const installedPlugins = new Set();
        const context = createAppContext();
        let isMounted = false;
        // 
        const app = {
            use(){

            },

            mixin(){

            },

            component(){

            },

            directive(){

            },

            mount(){


            },

            unmount(){

            },

            provide(){

            }
        }
        return app;
    }
}