import Link from 'next/link'
import Button from '../components/child'

export default ( { children } ) => (
    // 全局组件
    <> 
    <header>
        <Link>
            <Button> Button A </Button>
        </Link>
        <Link>
            <Button> Button B</Button>
        </Link>
    </header>
    // 组件内容
    { children }
    </>
)