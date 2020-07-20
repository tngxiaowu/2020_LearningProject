import { connect } from 'react-redux'
import { button, Button, Tabs} from 'antd' 
import {  useEffect } from 'react'

import Router ,{ withRouter }from 'next/router'

import LRU from 'lru-cache'


import Repo from '../components/userReps'


const  isServer = typeof window === 'undefined'
let cachedUserRepos;

const cache = new LRU({
    maxAge: 10 * 1000 * 60
})


const api = require('../lib/api')


function Index({ userRepos,user,router}){


    const { key:tabkey = '1' } = router.query
  
    const handleTabChange = ( tabKey )=>{
        Router.push(`key=${tabKey}`)
    }

    useEffect(()=>{
        if(!isServer){
            cache.set('useRepos',userRepos)
        }
    },[userRepos])


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
                <Tabs  defaultActiveKey={tabKey} animated={false}>
                    <Tabs.TabPane  tab='你的仓库' key='1' >
                        {userRepos.map(  userRepo =>{
                            <Repo userReop={ userRepo }  />
                        })}
                    </Tabs.TabPane>
                    <Tabs.TabPane  tab='你关注的仓库' key='2' >
                        {userRepos.map(  userRepo =>{
                            <Repo userReop={ userRepo }  />
                        })}
                    </Tabs.TabPane>
                </Tabs>
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

    if(!isServer){
        if(cache.get('useRepos')){
            return {
                isLogin: true,
                userReops:cache.get('useRepos')
            }
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

export default withRouter(connect(
    function mapState(state){
        return {
            user: state.user
        }
    }
)(index))