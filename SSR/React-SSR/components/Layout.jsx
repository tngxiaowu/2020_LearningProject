import { useEffect,useCallback } from 'react'
import { Layout, Icon,Input,Avatar } from 'antd';
import { useEffect, useCallback } from 'react';
const { Header, Content, Footer } = Layout;

export default ( { children } ) => {
    const [searchVal,setSearchVal] = useEffect('')
    let handleChange = useCallback(  (e)=>{  setSearchVal(e.target.value) } )
    let handleSearch = useCallback( ()=> { )


    return (
        <Layout>
            <Header>
                <div  className='header-contaniner'>
                    <div className='header-left'>
                        <Icon>   </Icon>
                        <Input.Search  value={searchVal}  onChange={handleChange}  onSearch={handleSearch}  placeholder='请输入内容' />
                    </div>
                    <div className='header-right'>
                        <Avatar>
                    </div>
                </div>
            </Header>
            <Content>
            { children }
            </Content>
            <Footer>
                Develop By Unknown Author
            </Footer>
        </Layout>
    )
    }