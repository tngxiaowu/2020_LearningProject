import React, { useState } from 'react';


function Example(){
    const [count,setCount] = useState(0);

    return (
        <div>
            <p> You clicked { count } times  </p>
            <button onClick= {  () => setCount( count + 1 ) } >
                Click Me！
            </button>
        </div>
    )
}



class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
  }
