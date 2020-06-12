class compiler extends Tapable {
    // 继承父类tapable
    super()
    // 定义一些列钩子函数

    constructor(){
        this.hooks = {
            shouldEmit,
            done,
            additionalPass,
            beforeRun,
            run, 
            emit, // 生成资源到output目录之前
            assetRmitted,
            afterEmit, // 生成资源到output目录之后
    
            thisCompilation,
            compilation,
            normalModuleFactory,
            contextModuleFactory,
    
            beforeCompile,
            compile,
            make,
            afterCompile,
    
            watchRun,
            failed, // 
            invalid, // 监听模式下 编译无效
            watchClose, // 监听模式通知
    
            infrastructureLog,
    
            environment, // environment准备好之后
            afterEnvironment, // environment安装完成之后  
            aferPlugins, // 设置完初始插件之后 执行插件
            afterEesolvers, // resolver安装完成之后
            entryOption
        }
    
        // 定义一系列属性
        this.name = undefined;
        
        // ...  
    
        this.running = false;
    }

    watch(){

    }

    run(cb){
        if(this.running) { return cb() };
        // 定义最终回调函数
        const finalCallback = ( err,stats) =>{}
        const startTime = Date.now();
        this.running = true;
        // 定义编译完成函数
        const onCompiled = (err,compilation ) => {}
        // 执行beforeRun钩子函数
        this.hooks.beforeRun.callAsync(this , err => {
            if (err) return finalCallback(err);
            // 执行run钩子函数
			this.hooks.run.callAsync(this, err => {
				if (err) return finalCallback(err);
                // 执行readRecords 函数
                this.readRecords(err => {
                    if (err) return finalCallback(err);
                    // 执行compile函数
					this.compile(onCompiled);
				});
			});

        })
    }

    readRecords(callback) {
		this.inputFileSystem.stat(this.recordsInputPath, err => {
			this.inputFileSystem.readFile(this.recordsInputPath, (err, content) => {
                this.records = parseJson(content.toString("utf-8"));
				return callback();
			});
		});
    }
    
    compile(callback) {
        const params = this.newCompilationParams();
        // 执行 beforeCompile 钩子函数
		this.hooks.beforeCompile.callAsync(params, err => {
            // 执行 compile 钩子函数
            this.hooks.compile.call(params);
            // 初始化compilation对象
            const compilation = this.newCompilation(params);
            // 执行 make 钩子函数 -> 编译主力大军
			this.hooks.make.callAsync(compilation, err => {
                // 编译完成
				compilation.finish(err => {
					compilation.seal(err => {
                        // 执行compile函数
						this.hooks.afterCompile.callAsync(compilation, err => {
                            // 执行最终回调函数
							return callback(null, compilation);
						});
					});
				});
			});
		});
	}

    // 定义一系列方法
}

const webpack = (options,callback) =>{
    // 处理options
    options = new WebpackOptionsDefaulter().process(options);

    const compiler = new Compiler(options);
    // node环境的钩子函数
    new NodeEnvironmentPlugin();

    // 执行pulgins
    for(const plugin of options.plugins){
        plugin.call(compiler,compiler);
    }

    if(callback){
        // ......
    }
}

class WebpackOptionsDefaulter extends defaultOptions{
    constructor(){

        super();

        this.set('entry','src');
        
        // ....

        this.set('target','web');


    }
}

class defaultOptions{
    constructor(){
        this.defaults = {};
        this.config = {};
    }

    process(options){
        options = Object.create({},options);
        for(let name in this.defaults){
            switch(this.config[name]){
                case undefined:
                    break;
                case 'call':
                    break;
                case 'make':
                    break;
                case 'append':
                    break;
                default:
                    throw new Error();
            }
        }
    }

    set(name, config, def){
        if(def !== undefined){
            this.defaults[name] = def;
            this.config[name] = config;
        }else{
            this.defaults[name] = config;
            delete this.config[name];
        }
    }
}

addEntry(context, entry, name, callback) {
    // 执行compation类中的addEntry钩子
    this.hooks.addEntry.call(entry, name);

    // 处理slot
    const slot = {};
    const idx = this._preparedEntrypoints.findIndex(slot => slot.name === name);
    if (idx >= 0) {
        // Overwrite existing entrypoint
        this._preparedEntrypoints[idx] = slot;
    } else {
        this._preparedEntrypoints.push(slot);
    }
    // 执行_addModuleChain方法
    this._addModuleChain();
}