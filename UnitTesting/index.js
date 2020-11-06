//单元测试及原理
//单元测试是指对软件中的最小可测试单元进行检查和验证，通过单元测试可以检测出潜在的bug，还可以快速反馈功能输出，验证代码是否达到预期，也可以保证代码重构的安全性。

//
// let add = (a, b) => a + b

// let result = add(1, 2)
// let expect = "3"

// //我们可以调用一下，然后跟我们预期的一个值比较下，如果不符合就抛出一个错误：
// if (result !== expect) {
//     throw new Error(`期望的值是${expect},实际是${result}`)
// }

//通用方法
let add = (a, b) => a + b;

const expect = (res) => {
  return {
    toBe: (expectRes) => {
      if(res !== expectRes){
        throw new Error(`期望值是${expectRes}，但实际上却是${res}!`)
      }
    }
  }
}

const test = (desc, fn) => {
  try{
    fn();
    console.log(`${desc} -> PASS`)
  }catch(e){
    console.error(`${desc} -> FAIL`, e);
  }
}

test('1+2=3', () => {
  expect(add(1,2)).toBe(3); // 1+2=3 -> PASS
});

test('1+2=4', () => {
  expect(add(1,2)).toBe(4); // 1+2=4 -> FAIL Error: 期望值是4，但实际上却是3!
});
//上面介绍的是单元测试的原理，事实上在我们写单元测试的时候并不需要自己写expect和test公用方法，
// 需要用到的比对方法也远远不止toBe一个。我们可以直接用第三方库Jest，他包含了几乎所有我们需要的工具，使用方法官网都有，这里主要讲原理，使用方法不再赘述。



