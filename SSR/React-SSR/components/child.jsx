import { withRouter } from 'next/router'
import Comp from './component/comp'

const A = ( { router,name } ) => <Comp> In A {router.query.id} </Comp>

A.getInitialProps = ( ) => {
    return {
        name: 'jocky'
    }
}


A.getInitialProps = async ()=> {
    const promise = new Promise( ( resolve,reject) => {
        setTimeout( ()=>{
            resolve({
                name:'Laowang'
            })
        },10000 )
    })

    return await promise
}

export default withRouter(A)