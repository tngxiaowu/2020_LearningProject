function getnum() {
  let num1 = Math.random().toString();
  let index1 = num1.indexOf(".") + 1;
  let num2 = Math.random().toString();
  let index2 = num2.indexOf(".") + 1;
  let result = `${num1.substring(index1, 9)}${num2.substring(index2, 9)}`;
  return result;
}

function test() {
  for (let i = 0; i < 100000000; i++) {
    let result = getnum();

    if (result.length !== 14) {
      console.log("妖兽啦", result, result.length);
    }
  }
}

test();

function renadomTest() {
  for (let i = 0; i < 100000000; i++) {
    let l = Math.random().toString().length;
    // console.log(l,'l')
    if (l < 9) {
      console.log(l);
    }
    //
  }
}

renadomTest();
