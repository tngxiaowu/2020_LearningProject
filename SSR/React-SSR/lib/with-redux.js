const isServer = typeof window === 'undefined'
const _NEXT_REDUX_STORE = '_NEXT_REDUX_STORE'

export default Comp => {
    class WithReduxApp extends React.Component{
        constructor(props){
            super(props)
            
        }
    }



    function TestHocComp({ Component, pageProps,...rest }){
        if(pageProps) pageProps.test = '123'
        return <Comp Component={Component} pageProps={pageProps} {...rest} >  </Comp>
    }

    TestHocComp.getInitialProps = Comp.getInitialProps

    return TestHocComp
}

