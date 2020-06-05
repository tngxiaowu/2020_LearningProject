class LRU{
    constructor(max){
        this.caches = Object.create(null); // 缓存对象
        this.keys = []; // 缓存键值
        this.max = max; // 缓存容量
    }
    // 获取数据
    get(key){
        if(this.caches[key]){
            return this.caches[key] 
        }else{
            return -1;
        }
    }
    // 写入数据
    set(key,value){
        // 判断数据是否存在
        if(this.caches[key]){
            // 如果存在 那么调整位置 
            this.adjust(key,keys);
        }else{
            // 如果不存在 
            // 是否已经到最大值
            this.keys.push(key);
            this.caches[key] = value;
            // 是 删除最旧的哪一个
            if(this.max < this.keys.length){
                const oldKey = this.keys[0]; // 最旧的一个key
                delete this.caches[oldKey];
                this.keys.shift(); 
            }
        }
    }
    // 调整key的位置
    adjust(){

    }

    remove(){

    }




}






// 这是Vue 2.0 keep-alive的实现
export default {
    name:'keep-alive',
    props:{
        // 包含的组件
        includes:{

        },
        // 排除的组件
        excludes:{

        },
        // 缓存的最大数量
        max:{

        }

    },

    created(){
        this.caches = Object.create(null);

        this.keys = []; // vnode的key值村粗

    },

    mounted(){

    },

    destoryed(){

    },

    render(){

    },

    methods(){

    }
}