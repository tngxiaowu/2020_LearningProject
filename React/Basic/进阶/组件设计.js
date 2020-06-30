class App extends Component {  
    constructor(props) {
      super(props)
      this.state = { number: 0 }
    }
  
    render() {
      return (
        <div className="app"> 
          <span className="number">{this.state.number}</span>
          {/* App组件不具有封装性 它将实例传给了子组件 并且子组件还可以更改父组件的内容 */}
          <Controls parent={this} />
        </div>
      )
    }
  }
  
  class Controls extends Component {
    updateNumber(toAdd) {
      this.props.parent.setState(prevState => ({
        number: prevState.number + toAdd       
      }))
    }
  
    render() {
      return (
        <div className="controls">
          <button onClick={() => this.updateNumber(+1)}>
            Increase
          </button> 
          <button onClick={() => this.updateNumber(-1)}>
            Decrease
          </button>
        </div>
      )
    }
  }

  // 封装性: 只有组件自己知道自己的state结构
  class App extends Component {  
    constructor(props) {
      super(props)
      this.state = { number: 0 }
    }
  
    updateNumber(toAdd) {
      this.setState(prevState => ({
        number: prevState.number + toAdd       
      }))
    }
  
    render() {
      return (
        <div className="app"> 
          <span className="number">{this.state.number}</span>
          <Controls 
            onIncrease={() => this.updateNumber(+1)}
            onDecrease={() => this.updateNumber(-1)} 
          />
        </div>
      )
    }
  }
  
  
  const Controls = ({ onIncrease, onDecrease }) => {  
    return (
      <div className="controls">
        <button onClick={onIncrease}>Increase</button> 
        <button onClick={onDecrease}>Decrease</button>
      </div>
    