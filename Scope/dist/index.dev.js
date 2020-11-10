"use strict";

//什么是作用域
// 第一个问题就是我们要弄清楚什么是作用域，这不是JS独有的概念，而是编程领域中通用的一个概念。我们以下面这个语句为例:
// let x = 1;
// 这一个简单的语句其实包含了几个基本的概念:
// 变量(variable)：这里x就是一个变量，是用来指代一个值的符号。
// 值(value)：就是具体的数据，可以是数字，字符串，对象等。这里1就是一个值。
// 变量绑定(name binding)：就是变量和值之间建立对应关系，x = 1就是将变量x和1联系起来了。
// 作用域(scope)：作用域就是变量绑定(name binding)的有效范围。就是说在这个作用域中，这个变量绑定是有效的，出了这个作用域变量绑定就无效了
// 静态作用域
// 静态作用域又叫词法作用域，JS就是静态作用域，比如如下代码:
var x = 10;

function fun() {
  return x;
}

function fx() {
  var x = 20;
  return fun();
}

console.log(fx()); //10
//上述代码中，函数f返回的x是外层定义的x，也就是10，我们调用g的时候，虽然g里面也有个变量x，但是在这里我们并没有用它，用的是f里面的x。
// 也就是说我们调用一个函数时，如果这个函数的变量没有在函数中定义，就去定义该函数的地方查找，这种查找关系在我们代码写出来的时候其实就确定了，所以叫静态作用域。
// 这是一段很简单的代码，大家都知道输出是10，难道还能输出20？还真有输出20的，那就是动态作用域了
//变量声明提前
// 在ES6之前，我们申明变量都是使用var，使用var申明的变量都是函数作用域，即在函数体内可见，这会带来的一个问题就是申明提前。

var a = 2;

function f() {
  console.log(a);
  var a = 5;
}

f(); //undefined
//上述代码的输出是undefined，因为函数f里面的变量x使用var申明，所以他其实在整个函数f可见，
// 也就是说，他的声明相当于提前到了f的最顶部，但是赋值还是在运行的x = 2时进行，所以在var x = 2;上面打印x就是undefined，上面的代码其实等价于:
// var a = 2;
// function f() {
//     var a
//     console.log(a)
//     var a = 5
// }
// f()//undefined
//函数声明提前
// 看下面这个代码：

function f2() {
  x();

  function x() {
    console.log(1);
  }
}

f2(); //1
//上述代码x()调用是可以成功的，因为函数的声明也会提前到当前函数的最前面，也就是说，上面函数x会提前到f的最顶部执行，上面代码等价于:
// function f2() {
//     function x() {
//         console.log(1);
//     }
//     x();
// }
// f2();
//但是有一点需要注意，上面的x函数如果换成函数表达式就不行了:
// function f3() {
//     x2();
//     var x2 = function () {
//         console.log(1);
//     }
// }
// f3();//x2 is not a function
// 复制代码这样写会报错Uncaught TypeError: x is not a function。
// 因为这里的x其实就是一个普通变量，只是它的值是一个函数，它虽然会提前到当前函数的最顶部申明，但是就像前面讲的，这时候他的值是undefined，将undefined当成函数调用，肯定就是TypeError。
//块级作用域
// 前面的申明提前不太符合人们正常的思维习惯，对JS不太熟悉的初学者如果不了解这个机制，可能会经常遇到各种TypeError，写出来的代码也可能隐含各种BUG。为了解决这个问题，ES6引入了块级作用域。
// 块级作用域就是指变量在指定的代码块里面才能访问，也就是一对{}中可以访问，在外面无法访问。为了区分之前的var，块级作用域使用let和const声明，let申明变量，const申明常量。看如下代码:

function fn2(args) {
  var y = 2;

  if (true) {
    var x = 5;
    var _y = 1;
  }

  console.log(y);
  console.log(x);
}

fn2(); //2 5
//上述代码我们在函数体里面用let申明了一个y，这时候他的作用域就是整个函数，然后又有了一个if，这个if里面用var申明了一个x，
// 用let又申明了一个y，因为var是函数作用域，所以在if外面也可以访问到这个x，打印出来就是5，if里面的那个y因为是let申明的，所以他是块级作用域，
// 也就是只在if里面生效，如果在外面打印y，会拿到最开始那个y，也就是2
//不允许重复申明
// 块级作用域在同一个块中是不允许重复申明的，比如:
// var x2=10;
// let x2=10;
//Identifier 'x2' has already been declared
//但是如果你都用var申明就不会报错:
// var x2 = 1;
// var x2 = 2;
//不会变量提升？
// 经常看到有文章说: 用let和const申明的变量不会提升。其实这种说法是不准确的，比如下面代码:
// var x2=10;
// if(true){
//     console.log(x2)
//     //Cannot access 'x2' before initialization
//     let x2=20
// }
//上述代码会报错Uncaught ReferenceError: Cannot access 'x2' before initialization。
// 如果let申明的x没有变量提升，那我们在他前面console应该拿到外层var定义的x才对。
// 但是现在却报错了，说明执行器在if这个块里面其实是提前知道了下面有一个let申明的x2的，所以说变量完全不提升是不准确的。
// 只是提升后的行为跟var不一样，var是读到一个undefined，**而块级作用域的提升行为是会制造一个暂时性死区(temporal dead zone, TDZ)。
// **暂时性死区的现象就是在块级顶部到变量正式申明这块区域去访问这个变量的话，直接报错，这个是ES6规范规定的。
//循环语句中的应用
// 下面这种问题我们也经常遇到，在一个循环中调用异步函数，期望是每次调用都拿到对应的循环变量，但是最终拿到的却是最后的循环变量:
// for(var i=0;i<3;i++){
//     setTimeout(()=>{
//         console.log(i)
//     })
// }//3 3 3
//上述代码我们期望的是输出0,1,2，但是最终输出的却是三个3，这是因为setTimeout是异步代码，会在下次事件循环执行，
// 而i++却是同步代码，而全部执行完，等到setTimeout执行时，i++已经执行完了，此时i已经是3了。以前为了解决这个问题，我们一般采用自执行函数:

for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    });
  })(i);
} //0 1 2
//现在有了let 直接使用let就行了


var _loop = function _loop(_i) {
  setTimeout(function () {
    console.log(_i);
  });
};

for (var _i = 0; _i < 3; _i++) {
  _loop(_i);
} //0 1 2
//这种写法也适用于for...in和for...of循环:


var obj = {
  x: 1,
  y: 2,
  v: 3
};

var _loop2 = function _loop2(k) {
  setTimeout(function () {
    console.log(obj[k]);
  });
};

for (var k in obj) {
  _loop2(k);
} //1 2 3
//那能不能使用const来申明循环变量呢？对于for(const i = 0; i < 3; i++)来说，const i = 0是没问题的，但是i++肯定就报错了，所以这个循环会运行一次，然后就报错了。
// 对于for...in和for...of循环，使用const声明是没问题的。


var obj2 = {
  x: "z",
  y: "x",
  v: "q"
};

var _loop3 = function _loop3(_k) {
  setTimeout(function () {
    console.log(obj2[_k]);
  });
};

for (var _k in obj2) {
  _loop3(_k);
} //z x q
//不影响全局对象
// 在最外层(全局作用域)使用var申明变量，该变量会成为全局对象的属性，如果全局对象刚好有同名属性，就会被覆盖。
// var Json="jsonx"
// console.log(window.Json)//// JSON被覆盖了，输出'jsonx'


var Json = "jsonx";
console.log(window.Json); //undefind 没有被覆盖 依旧是window的json
//上面这么多点其实都是let和const对以前的var进行的改进，如果我们的开发环境支持ES6，我们就应该使用let和const，而不是var。
//作用域链
// 作用域链其实是一个很简单的概念，当我们使用一个变量时，先在当前作用域查找，如果没找到就去他外层作用域查找，如果还没有，就再继续往外找，一直找到全局作用域，如果最终都没找到，就报错。比如如下代码:

var chain = 999;

function chainFn() {
  function chainFn1() {
    console.log(chain);
  }

  chainFn1();
}

chainFn(); //999
//这段代码在chainFn1中输出了x，所以他会在chainFn1中查找这个变量，当然没找到，然后去chainFn中找，还是没找到，再往上去全局作用域找，这下找到了。这个查找链条就是作用域链。
//作用域链延长
// 前面那个例子的作用域链上其实有三个对象：
// f1作用域 -> f作用域 -> 全局作用域
//大部分情况都是这样的，作用域链有多长主要看它当前嵌套的层数，但是有些语句可以在作用域链的前端临时增加一个变量对象，这个变量对象在代码执行完后移除，这就是作用域延长了。
// 能够导致作用域延长的语句有两种:try...catch的catch块和with语句。
// try...catch
// 这其实是我们一直在用的一个特殊情况:

var x3 = 5;

try {
  x = x + y;
} catch (e) {
  console.log(e); //ReferenceError: y is not definedat index.js:215
} //上述代码try里面我们用到了一个没有申明的变量y，所以会报错，然后走到catch，catch会往作用域链最前面添加一个变量e，这是当前的错误对象，
// 我们可以通过这个变量来访问到错误对象，这其实就相当于作用域链延长了。这个变量e会在catch块执行完后被销毁。
//with
// with语句可以操作作用域链，可以手动将某个对象添加到作用域链最前面，查找变量时，优先去这个对象查找，with块执行完后，作用域链会恢复到正常状态。
// function withFn(obj,i) {
//     with(obj){
//         console.log(i)
//     }
//     console.log(i)
// }
// withFn({i:1},5)
//上述代码，with里面输出的i优先去obj找，相当于手动在作用域链最前面添加了obj这个对象，所以输出的i是1。
// with外面还是正常的作用域链，所以输出的i仍然是5。需要注意的是with语句里面的作用域链要执行时才能确定，引擎没办法优化，所以严格模式下是禁止使用with的。
//总结
// 作用域其实就是一个变量绑定的有效范围。
// JS使用的是静态作用域，即一个函数使用的变量如果没在自己里面，会去定义的地方查找，而不是去调用的地方查找。去调用的地方找到的是动态作用域。
// var变量会进行申明提前，在赋值前可以访问到这个变量，值是undefined。
// 函数申明也会被提前，而且优先级比var高。
// 使用var的函数表达式其实就是一个var变量，在赋值前调用相当于undefined()，会直接报错。
// let和const是块级作用域，有效范围是一对{}。
// 同一个块级作用域里面不能重复申明，会报错。
// 块级作用域也有“变量提升”，但是行为跟var不一样，块级作用域里面的“变量提升”会形成“暂时性死区”，在申明前访问会直接报错。
// 使用let和const可以很方便的解决循环中异步调用参数不对的问题。
// let和const在全局作用域申明的变量不会成为全局对象的属性，var会。
// 访问变量时，如果当前作用域没有，会一级一级往上找，一直到全局作用域，这就是作用域链。
// try...catch的catch块会延长作用域链，往最前面添加一个错误对象。
// with语句可以手动往作用域链最前面添加一个对象，但是严格模式下不可用。
// 如果开发环境支持ES6，就应该使用let和const，不要用var。