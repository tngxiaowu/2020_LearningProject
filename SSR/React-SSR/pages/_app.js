// 覆盖next.js默认组件的地方

import App,{ Container } from 'next/app'
import Layout from '../components/Layout'
import MyContext from '../lib/my-context'
import { Provider } from 'react'
import store from '../store/store'
import Router from 'next/router'


import PageLoad from '../components/PageLoading' 

// 引入antd的样式
import 'antd/dist/antd.css'


class MyApp extends App{
    state = {
        context:'value',
        loading: false,
    }

    startLoading = () => {
        this.setState({
            loading: true,
        })
    }

    stopLoading = () => {
        this.setState({
            loading: false,
        })
    }

    componentDidMount(){
        Router.events.on('rootChangeStart',this.startLoading)
        Router.events.on('rootChangeComplete',this.stopLoading)
        Router.events.on('rootChangeError',this.stopLoading)
    }

    componentWillUnmount(){
        Router.events.off('rootChangeStart',this.startLoading)
        Router.events.off('rootChangeComplete',this.stopLoading)
        Router.events.off('rootChangeError',this.stopLoading)

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
                <Provider store={store}>
                {/* 值注入 */}
                    { this.state.loading ? <PageLoad /> : null }
                        <Component {...pageProps} />
                </Provider>
            </Container>
        ) 
    }
}


export default App 



