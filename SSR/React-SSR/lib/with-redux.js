const inServer = typeof window === 'undefined'
const _NEXT_REDUX_STORE = '_NEXT_REDUX_STORE'

export default Comp => {
    class WithReduxApp extends React.Component{
        constructor(props){
            super(props)
            
        }
    }

    WithReduxApp.getInitialProps = async ctx => {
        let reduxStore;
        if(inServer){
            const { req } = ctx.ctx
            const session = req.session
            if(session && session.userInfo){
                reduxStore = getOrCreateStore({
                    user: session.userInfo
                })
            }else{
                reduxStore = getOrCreateStore()
            }
        }else{
            reduxStore = getOrCreateStore()
        }
    }



    function TestHocComp({ Component, pageProps,...rest }){
        if(pageProps) pageProps.test = '123'
        return <Comp Component={Component} pageProps={pageProps} {...rest} >  </Comp>
    }

    TestHocComp.getInitialProps = Comp.getInitialProps

    return TestHocComp
}

