import { Suspense } from 'react';

// 动态import语法
import('./math').then( match => {
    console.log( match.add(5,4));
})


// React.lazy

const otherComponent = React.lazy( () => { import('./otherComponent')} )

// 基于路由的代码分割

const app = () => {
    <Router>
        <Suspense  fallback={<div>Loading...</div>}>
            <Switch>
                <Route path='/'  component={Home} />
                <Route path='about' component={About} />
            </Switch>
        </Suspense>
    </Router>


}