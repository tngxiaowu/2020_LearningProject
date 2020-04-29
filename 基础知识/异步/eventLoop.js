// 1.0
// 安装顺序执行任务 -> 万一中间有输入事件如何
{
    task1();
    task2();
    task3();
    task4();
}

// 2.0 引入事件循环机制
{   
   while(true){
    let inputValue = getInputValue(); // 监听输入事件
    console.log(inputValue); // 一旦有事件输入 等输入完成 那么执行相应任务
   }
}

// 3.0 引入消息队列
// 其他线程也会发送相关事件给主线程  那么就维护一个消息队列
{
    while(true){
        const taskQueue = [];
        const task = taskQueue.slice(1,0); // 消息队列不太灵活 -> 消息的优先级 和 效率
        if(task){
            task();
        }
    }

}