import { useEffect,useCallback } from 'react'
import { Layout, Icon,Input,Avatar,Tooltip,Menu,Dropdown} from 'antd';
import { useEffect, useCallback } from 'react';
import Container from './Container';
const { Header, Content, Footer } = Layout;





import { connect } from 'react-redux'
import getConfig from 'next/config'
import { logout } from '../store/store';

const {  publicRuntimeConfig } = getConfig()

const Comp = ( { children,color ,style}) => {
    <div style = {{ color, ,,,style }} >
    </div>
}

function MyLayout({children,user,logout}){
    const [searchVal,setSearchVal] = useEffect('')
    let handleChange = useCallback(  (e)=>{  setSearchVal(e.target.value) } )
    let handleSearch = useCallback( ()=> { )
    const handleLogout = useCallback(  ()=> {  logout() },[])    

    const userDropDown =  (
        <Menu.Item>
          <a href='javascript:void(0)'  onChange={ handleLogout } >
              登 出
          </a>
        </Menu.Item>
    )

    return (
        <Layout>
            <Header>
                <div  className='header-contaniner'>
                    <div className='header-left'>
                        <Icon/>
                        <Input.Search  value={searchVal}  onChange={handleChange}  onSearch={handleSearch}  placeholder='请输入内容' />
                    </div>
                    <div className='header-right'>
                        { 
                            user && user.id  ?  (
                                <Dropdown overlay={userDropDown} >
                                    <a  href='/'>
                                    <Avatar size={40}  src={user.avatr_url} />
                                </a>
                                </Dropdown>
                                
                                ):(
                                <Tooltip title='请点击登录' >
                                    <a  href={ publicRuntimeConfig.OATHI_URL }>
                                        <Avatar size={40}  icon='user' />
                                    </a>
                                </Tooltip>
                                )
                        }
                    </div>
                </div>
            </Header>
            <Content>
                {/* 相当于React.createElement */}
                <Container renderer={ <Comp  color='red' /> } >  
                    { children }
                </Container>
            </Content>
            <Footer>
                Develop By Unknown Author
            </Footer>
        </Layout>
    )
    }

export default connect(function mapState(state){
    return {
        user: state.user
    }
}, function mapReducer(dispatch){
    return {
        logout: dispatch(logout())
    }
})(MyLayout)