// 覆盖next.js默认组件的地方

import App,{ Container } from 'next/app'
import Layout from '../components/Layout'

// 引入antd的样式
import 'antd/dist/antd.css'


class MyApp extends App{
    state = {
        conunt:1 
    }


    // 给组件自定义传数据
    static async getInitialProps( { Component } ){
        let pageProps;
        // 可能某些组件并没有getInitialProps这个方法
        if(Component.getInitialProps) pageProps = await Component.getInitialProps()
        return {
            pageProps
        }
    }

    render(){
        // Component就是pages下面的页面
        const { Component }  = this.props

        return(
            <Container>
                <Component {...pageProps} />
            </Container>
        ) 
    }
}


export default App 



