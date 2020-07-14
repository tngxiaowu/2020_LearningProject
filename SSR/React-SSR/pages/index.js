import { connect } from 'react-redux'
import { button, Button } from 'antd' 


const api = require('../lib/api')


function Index({ userRepos,user }){
    // 用户未登录时的信息
    if(!user || user.id){
        return (
            <div className='root' >
                 <p> 亲，您还未登录哦 </p>
                 <Button type='primary'  hred='login'>  
                    登录  
                 </Button>
                 <style jsx>
                     `
                     .root{
                         display: felx
                     }
                     
                     `
                 </style>
            </div>
        )
    }
    // 用户登录后的信息
    return (
        <div className='root'>
            <div className='userInfo'>
                userInfo
            </div>
            <div className='userRepo'>
                userRepos
            </div>
        </div>
    )
    
}

Index.getInitialProps = async ( { ctx,reduxStore } ) =>{
    const user = reduxStore.getState().user;
    // 避免在用到需要token的接口时因为没有Token信息而返回401
    if(!user || !use.id){
        return {
            isLogin:false
        }
    }

    const result = await api.request({
        url:'/user/props'
    },
    ctx.req,
    ctx.res)

    return {
        isLogin: true,
        userRepos: result.data,
    }
}  

export default connect(
    function mapState(state){
        return {
            user: state.user
        }
    }
)(index)