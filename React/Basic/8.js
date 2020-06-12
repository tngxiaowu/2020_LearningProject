{
    const numbers = [1,2,3,4,5];
    const doubled = numbers.map(  number => numbers * 2 );
}

// 渲染多个组件
{   
    const numbers = [1,2,3,4,5];
    const listItmes = numbers.map( number =>{
        <li>{ number }</li>
    } )

    ReactDOM.render(
        <ul> {listItmes}</ul>,
        document.getElementById('root')
    )
}

{
    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
          <li key= {number.toString()}>
              {number}
          </li>
        );
        return (
          <ul>{listItems}</ul>
        );
      }
      
      const numbers = [1, 2, 3, 4, 5];
      ReactDOM.render(
        <NumberList numbers={numbers} />,
        document.getElementById('root')
      );

}