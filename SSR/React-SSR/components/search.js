import { withRouter } from 'next/router'

import { Row, Col,List,Pagination } from 'antd'
import { Link,memo } from 'react'
import { Router} from 'next/router'

import Repo from '../components/userReps'
 

import api from '../lib/api'

const LANGUAGES = []

const MATCH_TYPES =[]

const noop = ()=> { }

const FilterLink = memo(({name,query,lang,sort,order}) => {
    let queryString; 
    return (
    <Link href={`/search${queryString}`} >
         <a> { name } </a>
    </Link>
   )
})


function Search({ router,repos }){
    const { ...querys } =  router.query;
    const { sort,lang,order, } = router.query;

    let selectedStyle = {
        color: 'red'
    }

    const handleLanguageChange = (lang) => {
        Router.push({
            pathname:'/search',
            query:{
                qury,
                lang,
                sort,
                order
            }
        })
    }
    }

    return (
        <div className='root'>
            <Row gutter={20}>
                <Col span={6} >
                        <List
                            header={ <span className='list-header'> 语言 </span> }
                            style = { { marginBottom: 20 } }
                            dataSource={ LANGUAGES }
                            renderItems = {  item => {
                                let isSelected = item === lang;

                                retrun 
                                <FilterLink 
                                { ...querys }
                                sort = {item.value}
                                order = {item.order}
                                sort = { item.sort }
                                />
                               
                            } }
                        />
                </Col>
                <Col span={18}>
                    { repos.items.map( repo => {
                        <Repo  repo={repo} key={repo.id} />
                    } ) }

                    <div>
                        <Pagination 
                            pageSize={30}
                            curent = { Number(page) || 1 }
                            total={repos.total_count}
                            onChange={noop}
                            itemRender = { ( page,type,ol )=>{
                                const p 
                            }}
                        
                        />

                    </div>
                </Col>
            </Row>
        </div>
    )

}

Search.getInitialProps = async ( { ctx } ) => {
    const { query,lang, sort, order, page } = ctx;

    let queryString;

    // 处理一系列query

    const result = await api.request({
        url:'/api/search',
        query:queryString
    })

    return {
        repos: result.data
    }
}

export default withRouter(Search)