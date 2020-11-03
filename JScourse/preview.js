// a.toString()	返回一个包含数组中所有元素的字符串，每个元素通过逗号分隔。
// a.toLocaleString()	根据宿主环境的区域设置，返回一个包含数组中所有元素的字符串，每个元素通过逗号分隔。
// a.concat(item1[, item2[, ...[, itemN]]])	返回一个数组，这个数组包含原先 a 和 item1、item2、……、itemN 中的所有元素。
// a.join(sep)	返回一个包含数组中所有元素的字符串，每个元素通过指定的 sep 分隔。
// a.pop()	删除并返回数组中的最后一个元素。
// a.push(item1, ..., itemN)	将 item1、item2、……、itemN 追加至数组 a。
// a.reverse()	数组逆序（会更改原数组 a）。
// a.shift()	删除并返回数组中第一个元素。
// a.slice(start, end)	返回子数组，以 a[start] 开头，以 a[end] 前一个元素结尾。
// a.sort([cmpfn])	
// 依据可选的比较函数 cmpfn 进行排序，如果未指定比较函数，则按字符顺序比较（即使被比较元素是数字）。

// a.splice(start, delcount[, item1[, ...[, itemN]]])	
// 从 start 开始，删除 delcount 个元素，然后插入所有的 item。

// a.unshift(item1[, item2[, ...[, itemN]]])	
// 将 item 插入数组头部，返回数组新长度（考虑 undefined）。

//创建一个求平均数的函数吧：
// function avg() {
//     let sun=0;
//     for(let i=0,j=arguments.length;i<j;i++){
//         sun+=arguments[i]
//     }
//     return sun/arguments.length
//   }
//   console.log(avg(10,10,10,10,10))//10

// 有些冗长。 为了使代码变短一些， 我们可以使用剩余参数来替换arguments的使用。 在这方法中， 
// 我们可以传递任意数量的参数到函数中同时尽量减少我们的代码。这个剩余参数操作符在函数中以：...variable 的形式被使用，
// 它将包含在调用函数时使用的未捕获整个参数列表到这个变量中。 我们同样也可以将for 循环替换为 for... of 循环来返回我们变量的值。
// function avg(...args) { 
//     let sun=0;
//     for(let value of args){
//         sun+=value
//     }
//     return sun/args.length
//  }
//  console.log(avg(10,10,10,10,10))//10

// 在上面这段代码中， 所有被传入该函数的参数都被变量 args 所持有。需要注意的是，
// 无论“ 剩余参数操作符” 被放置到函数声明的哪里， 它都会把除了自己之前的所有参数存储起来。 比如函数：function avg(firstValue, ...args) 会把传入函数的第一个值存入 firstValue， 
// 其他的参数存入 args。 这是虽然一个很有用的语言特性， 却也会带来新的问题。 avg() 函数只接受逗号分开的参数列表--但是如果你想要获取一个数组的平均值怎么办？ 一种方法是将函数按照如下方式重写：
// function avgArray(arr) {
//     var sum = 0;
//     for (var i = 0, j = arr.length; i < j; i++) {
//         sum += arr[i];
//     }
//     return sum / arr.length;
// }
// avgArray([2, 3, 4, 5]); // 3.5

//但如果能重用我们已经创建的那个函数不是更好吗？幸运的是 JavaScript 允许你通过任意函数对象的 apply() 方法来传递给它一个数组作为参数列表。
// avg.apply(null, [2, 3, 4, 5]); // 3.5

// 在经典的面向对象语言中， 对象是指数据和在这些数据上进行的操作的集合。 与 C++和 Java 不同， JavaScript 是一种基于原型的编程语言，
// 并没有 class 语句， 而是把函数用作类。 那么让我们来定义一个人名对象，
// 这个对象包括人的姓和名两个域（ field）。 名字的表示有两种方法：“ 名 姓（ First Last）” 或“ 姓, 名（ Last, First）”。
// 使用我们前面讨论过的函数和对象概念， 可以像这样完成定义：
// function makePerson(first, last) {
//     return {
//         first: first,
//         last: last
//     };
// }

// function personFullName(person) {
//     return person.first + ' ' + person.last;
// }

// function personFullNameReversed(person) {
//     return person.last + ', ' + person.first;
// }

// var s = makePerson('Simon', 'Willison');
// personFullName(s); // "Simon Willison"
// personFullNameReversed(s); // "Willison, Simon"

// 上面的写法虽然可以满足要求，但是看起来很麻烦，因为需要在全局命名空间中写很多函数。既然函数本身就是对象，如果需要使一个函数隶属于一个对象，那么不难得到：
// function makePerson(first, last) {
//     return {
//         first: first,
//         last: last,
//         fullName: function () {
//             return this.first + "" + this.last;
//         },
//         fullNameReversed:function(){
//             return this.last+""+this.first
//         }
//     }
// }
// var s=makePerson("ZHao","XinQi")
// console.log(s,s.fullName(),s.fullNameReversed())//{first: "ZHao", last: "XinQi", fullName: ƒ, fullNameReversed: ƒ}, ZHaoXinQi, XinQiZHao


// 如果某个函数依赖于其他的一两个函数，而这一两个函数对你其余的代码没有用处，你可以将它们嵌套在会被调用的那个函数内部，这样做可以减少全局作用域下的函数的数量，这有利于编写易于维护的代码。

// 这也是一个减少使用全局变量的好方法。当编写复杂代码时，程序员往往试图使用全局变量，将值共享给多个函数，但这样做会使代码很难维护。内部函数可以共享父函数的变量，
// 所以你可以使用这个特性把一些函数捆绑在一起，这样可以有效地防止“污染”你的全局命名空间——你可以称它为“局部全局（local global）”。虽然这种方法应该谨慎使用，但它确实很有用，应该掌握。
// function parentFunc() {
//     var a = 1;

//     function nestedFunc() {
//       var b = 4; // parentFunc 无法访问 b
//       return a + b;
//     }
//     return nestedFunc(); // 5
//   }

//闭包
function makeAdder(a) {
    return function (b) {
        return a + b
    }
}
var Adder1 = makeAdder(9)
var Adder2 = makeAdder(50)
Adder1(1) //10
Adder2(49) //99
//makeAdder 这个名字本身，便应该能说明函数是用来做什么的：它会用一个参数来创建一个新的“adder”函数，再用另一个参数来调用被创建的函数时，makeAdder 会将一前一后两个参数相加。
// 从被创建的函数的视角来看的话，这两个参数的来源问题会更显而易见：新函数自带一个参数——在新函数被创建时，便钦定、钦点了前一个参数（如上方代码中的 a、9 和 50，参考 makeAdder 的结构，它应当位于新函数外部）；
// 新函数被调用时，又接收了后一个参数（如上方代码中的 b、1 和 49，位于新函数内部）。最终，新函数被调用的时候，前一个参数便会和由外层函数传入的后一个参数相加。
// 这里发生的事情和前面介绍过的内嵌函数十分相似：一个函数被定义在了另外一个函数的内部，内部函数可以访问外部函数的变量。唯一的不同是，外部函数已经返回了，
// 那么常识告诉我们局部变量“应该”不再存在。但是它们却仍然存在——否则 adder 函数将不能工作。也就是说，这里存在 makeAdder 的局部变量的两个不同的“副本”——一个是 a 等于 9，另一个是 a 等于 50。