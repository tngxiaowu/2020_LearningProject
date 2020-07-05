import Document , {Hteml,Head,Main,NextScript} from 'next/document'
import { Component } from 'react'
import { ServerStyleSheet } from 'style-component'


class MyDocument extends Document {
    // 获取页面数据(不写也可以 如果写需要遵循下面)
    // 集成style-in-component方法
    static async getInitialProps(ctx){
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage;

        try{
            // 在页面渲染时的方法
            ctx.renderPage = () => originalRenderPage({
                // 拿到第三方库的样式 
                enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />),
                enhanceComponent => Component => Component // Pages下面的组件
            })

            const props = await Document.getInitialProps(ctx)

            return {
                ...props,
                styles: <>  {props.styles} {sheet.getStyleElement()} </>
            }
        }catch(e){

        }finally{
            
        }
    }

    // 如果需要在render里面重写内容 下面的这些是必须的
    render(){
        return (<Html>
            <Head>
                <title>  My App </title>
                {/* 自定义class名 */}
                <style> { `.test { color:red }` } </style>
            </Head>
            <body className='test' >
                <Main/>
                <NextScript/>
            </body>
        </Html>)
    }
}

export default MyDocument