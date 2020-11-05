//给数组的每个数字加一:

// var list=[1,2,3,4]
// var newList=[]
// for(let i=0;i<list.length;i++){
//     newList.push(list[i]+1)
// }
// console.log(newList)


//这段代码结果没有问题，但是没法重用。我们换一个思维，这里面包含的操作其实就两个，一个是遍历数组，一个是成员加一。我们把这两个方法拆出来：

//加一、乘一 
// let add = x => x + 1;
// let sub = x => x * 1

//事实上我们的加一函数只能加一，也不好复用，它还可以继续拆：
// 先写一个通用加法，他接收第一个加数，返回一个方法
// 返回的这个方法接收第二个加数，第一个加数是上层方法的a
// 这样当我们需要计算1+2是，就是add(1)(2)

// let add = (a) => {
//     return (b) => {
//         return a + b;
//     }
// }
// // 我们也可以将返回的函数赋给一个变量，这个变量也就变成一个能特定加a的一个方法
// let add1 = add(1);
// let res = add1(4);//5


// //通过遍历返回一个操作后的新数组
// //fn参数是我们想要做的事情
// let creatArr = (arr, fn) => {
//     let newArr = []
//     for (let i = 0; i < arr.length; i++) {
//         newArr.push(fn(arr[i]))
//     }
//     return newArr
// }


// let list = [1, 2, 3, 4]

// const newArr = creatArr(list, add1)
// console.log(newArr)



// 纯函数纯函数是指一个函数，如果它的调用参数相同，则永远返回相同的结果。
// 它不依赖于程序执行期间函数外部任何状态或数据的变化，只依赖于其输入参数。
// 同时函数的运行也不改变任何外部数据，它只通过它的返回值与外部通讯。
// 下面这个函数就不是纯函数，因为函数内部需要的discount需要从外部获取：

// let discount = 0.8;
// const calPrice = price => price * discount;
// let price = calPrice(200);  // 160

// // 当discount变了，calPrice传同样额参数，结果不一样，所以不纯
// discount = 0.9;
// price = calPrice(200);  // 180


// 要改为纯函数也很简单，将discount作为参数传递进去就行了
// let discount = 0.8;
// const calPrice = (price, discount) => price * discount
// var price = calPrice(80, 2)
// console.log(price) //160

// discount = 0.9;
// var price = calPrice(80, 2) //160
// console.log(price)




// //函数副作用
// // 函数副作用是指调用函数时除了返回函数值之外，还对主调用函数产生附加的影响，
// // 比如修改全局变量或者外部变量，或者修改参数。这可能会带来难以查找的问题并降低代码的可读性。
// // 下面的foo就有副作用，当后面有其他地方需要使用a，可能就会拿到一个被污染的值
// let a = 5;
// let foo = () => a = a * 10;
// foo();
// console.log(a); // 50


// //原生API也可能有副作用
// let arr = [1,2,3,4,5]
// arr.slice(1,3)//纯函数 不会改变原数组
// // arr.splice(1,3)//非纯函数 原数组改变
// arr.pop()//非纯函数 原数组改变
// console.log(arr)


//可变性和不可变性
// 可变性：指一个变量创建以后可以任意修改
// 不可变性： 指一个变量被创建后永远不会发生改变，不可变性是函数式编程的核心概念
//可变性：
// let data={count:1}
// let foo=(data)=>{
//     data.count=3
// }
// //使用foo函数
// foo(data)
// console.log(data)//3


//使用深拷贝实现 不可变：
let data={count:1}

let foo=(data)=>{
    let lily=JSON.parse(JSON.stringify(data))
    lily.count=3
}
foo(data)
console.log(data)//1






