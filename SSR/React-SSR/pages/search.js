import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.h1`
    color: yellow;
    font-size: 16px;
`

// 可以使用ES6模板字符串
const color = `#113366`

const Search = ( { router,name } ) =>(
    <>
        <Link href='#aaa' >
            <a className='link' >
                A { router.query.id } {  name}
            </a>
        </Link>
        <Title>
            This is A Style-Component Title
        </Title>

        {/* 原理就是在每个组件页面中 注入了 jsx+随机数类 */}
        <style jsx>{
            `
            a{
                color: blue
            }
            .link{
                color: red
            }
            `
        }
        <style jsx global>
            {
                `
                a{
                    color: ${color}
                }`
            }

        </style>
           
        </style>
    </>
)

export default Search