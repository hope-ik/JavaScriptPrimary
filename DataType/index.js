//原始数据类型存在栈中，引用类型在栈中存的是一个引用地址，这个地址指向的是堆中的一个数据对象。
// 需要注意的是null在这里我们算在原始类型里面，但是你用typeof的时候会发现他是object，
// 原因是就算他是一个对象，那他应该在栈中存一个引用地址，但是他是一个空对象，所以这个地址为空，也就是不对应堆中的任意一个数据，
// 他在堆中没有数据，只存在于栈中，所以这里算为了原始类型。
// 引用类型其实主要就是Object，Array和Function这些其实也都是Object派生出来的。

console.log(typeof null) //object

//原始类型的值无法更改，要更改只能重新赋值。像下面这样尝试去修改是不行的，但是整个重新赋值可以。
// 原始类型的比较就是比较值，值相等，他们就相等
let string = "abc"
string[1] = "k"
console.log(string) //abc

string = "k"
console.log(string) //k
//引用类型
// 引用类型的值是可以修改的，注意这个时候我们虽然修改了a里面的属性，但是a在栈上的引用地址并没有变化，变化的是堆中的数据。
let a = {
    x: 1
}
a.x = 2
console.log(a) //{x: 2}

//引用类型的比较是比较他们的索引地址，而不是他们的值。比如下面两个对象，看着是一样的，但是他们的引用地址不一样，其实是不等的：

let y = {
    x: 1
}
let u = {
    x: 1
}
console.log(y === u) //false
//要想让他们相等，得直接将y赋值为u，这样他们的引用地址一样，就是相等的。
y = u
console.log(y === u) //true


//类型转换
// JS中当不同类型的数据进行计算的时候会进行类型转换，比如下面的例子：
let e = "" - 1
let d = false + true
let f = null + 1
let g = undefined + 1
let h = [] + []
console.log(e, d, f, g, h) // -1 1 1 NaN ""
//上面的例子中，我们用了加减来操作几个非数字的类型，这时候JS会进行隐式的类型转换，然后再进行加减运算。
// 除了JS本身的隐式转换外，有时候我们还会主动进行类型转换，这就算是显示类型转换了。

//隐式类型转换
// 转为字符串
// 经常出现在+运算中，并且其中有一个操作数不是数值类型
let s = 5 + "px" + 4
console.log(s) //5px4

s = 123e-2 + "a"
console.log(s) //1.23a


//转为数值
// 经常出现在数学运算中，表示连接字符串的+运算除外
let sn = "abc"
console.log(+sn, -sn) //NaN NaN
sn = 123
console.log(+sn, -sn) //123 -123
sn = new Date()
console.log(+sn, -sn) //604976447629 -1604976447629(这相当于取毫秒数)


// /转为bool的场景
// 经常出现在if或者逻辑运算中
let bol = "abc"
if (bol) {
    console.log(true) //true
}
console.log(!!bol) //true

//下面的值在进行bool转换时会转换为false，除此以外都是true:
// 0
// NaN
// ''(空字符串)
// null
// undefined


//==运算符
// 当我们使用==进行比较时，如果两边的类型不同，JS会进行类型转换，然后再比较，===则不会进行类型转换，如果===两边的数据类型不同，直接返回false。


//显式类型转换
// 显式类型转换是我们自己写代码明确转换的类型，可以使代码看起来更清晰，是实际开发时推荐的做法。
String(123) //"123"
Number("123") //123
Boolean([]) //true
Object(3) //Number {3} 等价于new number(3)

//显式转换为字符串可以使用toString方法，它的执行结果通常和String()方法一致。
// Number类型的toString方法还支持参数，可以指定需要转换的进制。下面的图是一些原始类型的toString()，null和undefined没有toString方法，调用会报错:
// console.log((null).toString())
// console.log((undefined).toString())
console.log((123).toString()) //'123'
console.log((false).toString()) //'false'
// Number类型的toString方法支持进制:
let toStr = 5
console.log(toStr.toString(2)) //101


//转数值
// 转为数值就很简单了，经常在用，就是这两个全局方法：parseInt和parseFloat。



//对象转字符串
// 对象转换为字符串和数值会稍微麻烦点，下面我们单独来探究下。对象转为字符串主要有三种方法:


// value.toString()
// 这个前面讲过了


// '' + value。这个是前面提到过的隐式转换，但是value是对象的话会按照下面的顺序进行转换：

// 先调用value.valueOf方法，如果值是原始值，则返回
// 否则调用value.toString方法，如果值是原始值，则返回
// 否则报错TypeError



// String(value)。这个是前面提到的显式转换，流程跟前面类似，但是调用toString和valueOf的顺序不一样。

// 先调用value.toString方法，如果值是原始值，则返回
// 否则调用value.valueOf方法，如果值是原始值，则返回
// 否则报错TypeError



// 需要注意的是，Date对象有点特殊，他始终调用toString方法。
// 下面我们写一段代码来验证下:

Object.prototype.valueOf = function () {
    return 'aaa';
}

Object.prototype.toString = function () {
    return 'bbb';
}

let ty = {};
let b = '' + ty; ///aaa
let c = String(ty); //bbb

console.log(b); //aaa
console.log(c); //bbb



//对象转数值
// 对象类型转为数值主要有两种方法:

// +value
// Number(value)
// 这两种的执行逻辑是一样的:

// 先调用valueOf方法，如果值是原始值，就返回
// 否则，调用toString方法，然后将toString的返回值转换为数值
Object.prototype.valueOf = function () {
    return {}
}
Object.prototype.toString = function () {
    return "nnn"
}
let i = {}
let o = +i
let p = Number(i)
console.log(o, p) // NaN NaN
// 上述代码的输出都是NaN，这是因为我们toString方法返回的nnn没办法转化为正常数值，强行转就是NaN:

//typeof
// 做类型检测最常用的就是typeof了:
let aa;
typeof aa; // undefined

let bb = true;
typeof bb; // boolean

let cc = 123;
typeof cc; // number

let dd = 'abc';
typeof dd; // string

let ee = () => {};
typeof ee; // function

let ff = {};
typeof ff; // object

let gg = Symbol();
typeof gg; // symbol

// instanceof
// typeof最简单，但是他只能判断基本的类型，如果是对象的话，没法判断具体是哪个对象。instanceof可以检测一个对象是不是某个类的实例，这种检测其实基于面向对象和原型链的
let date = new Date();
date instanceof Date; // true

//constructor
// constructor的原理其实跟前面的instanceof有点像，也是基于面向对象和原型链的。
// 一个对象如果是一个类的实例的话，那他原型上的constructor其实也就指向了这个类，我们可以通过判断他的constructor来判断他是不是某个类的实例
console.log(date.constructor === Date) // true

//使用constructor判断的时候要注意，如果原型上的constructor被修改了，这种检测可能就失效了，比如
function nul() {}
nul.prototype={
    // constructor:nul,
    x:1
}
let result=new nul()
console.log(result.constructor===nul)//false
//上面为false的原因是，constructor这个属性其实是挂在a.prototype下面的，我们在给a.prototype赋值的时候其实覆盖了之前的整个prototype，也覆盖了a.prototype.constructor,
// 这时候他其实压根就没有这个属性，如果我们非要访问这个属性，只能去原型链上找，这时候会找到Object:

//要避免这个问题，我们在给原型添加属性时，最好不要整个覆盖，而是只添加我们需要的属性，上面的改为:
function nux() {}
// nux.prototype={
//     constructor:nux,//一定要全部覆蓋一定要把constructor重新加上
//     x:1
// }
nux.prototype.x=1

let result2=new nux()
console.log(result2.constructor===nux)//true


//Object.prototype.toString.call
// Object.prototype.toString.call是比较准确的，可以用来判断原生对象具体是哪个类型:
console.log(Object.prototype.toString.call(new Date()))//[object Date]
console.log(Object.prototype.toString.call(new Array()))//[object Array]



//一些原生方法: Array.isArray，Number.isInteger
// JS为了解决类型检测的问题，也引入了一些原生方法来提供支持，比如Array.isArray和Number.isInteger等。Array.isArray可以用来检测一个对象是不是数组:
console.log(Array.isArray([]))//true
console.log(Array.isArray({}))//false

//Number.isInteger可以用来检测一个对象是不是整数:
Number.isInteger(1);     // true
Number.isInteger(-1);    // true
Number.isInteger(-1.1);  // false
Number.isInteger('aaa'); // false

//小节

//方法              //特点
//typeof           只能检测原始类型，没办法检测具体的对象类型
//instanceof       无法检测原始类型，原理是原型链
//constructor      检查的是原型上的constructor，如果原型被覆盖了，检测结果不准确
//duck-typing      通过特点特征来检测类型，可以被具有同样特征的对象欺骗，不可靠
//Object.prototype.toString   只能检测原生对象，不能检测自定义类型
//原生方法          使用方便，只是现在原生方便比较少


// 总结

// JS有两种数据类型，原始类型和引用类型，引用类型主要就是对象。
// 当我们使用+，逻辑判断或者==时会有隐式的类型转换。
// 有时候隐式的类型转换会出现我们不想要的结果，如果我们确定要进行判断或者类型转换，最好使用显式的，比如使用===，而不是==。
// 对象转为字符串和数值可能需要调valueOf和toString方法，调用顺序需要看具体场景。
// JS没有一个完美的类型检测方法，我们最好根据需要选择具体的检测方法。
