export default Comp => {
    function TestHocComp({ Component, pageProps,...rest }){
        if(pageProps) pageProps.test = '123'
        return <Comp Component={Component} pageProps={pageProps} {...rest} >  </Comp>
    }

    TestHocComp.getInitialProps = Comp.getInitialProps

    return TestHocComp
}

