import Link from 'next/link'
import Router from 'next/router'
import Button from '../components/child'

export default () => (
    // 跳转到相关路由
    // 进行前端路由跳转
    // 指定渲染内容
    // Link节点下面的(根)节点必须是唯一
    <Link href='/a?b=1'>
        <Button> Index </Button>
    </Link>
)

export default () => {
    // 和使用Link一样(因为内部实现是相同的)
    function goToRouter(){
        Router.push({
            pathName:'/test',
            query:{
                id:1
            }
        })
    }
    return (
        <Button onClick={ goToRouter } > Click Me </Button>
    )
}