// console.log(Math.PI)  // 返回 3.141592653589793


// Math.round()
// Math.round(e) 的返回值是 e 四舍五入为最接近的整数：
// console.log(Math.round(3.6))//4
// console.log(Math.round(3.4))//3


//Math.pow()
// Math.pow(x, y) 的返回值是 x 的 y 次幂：
// console.log(Math.pow(8, 3))//512

//Math.sqrt()
// Math.sqrt(x) 返回 x 的平方根：
// console.log(Math.sqrt(64))//8

// Math.abs()
// Math.abs(x) 返回 x 的绝对（正）值：
// console.log(Math.abs(-4.7))//4.7

//Math.ceil()
// Math.ceil(x) 的返回值是 x 上舍入最接近的整数：
// console.log(Math.ceil(4.1))//5

//Math.floor()
// Math.floor(x) 的返回值是 x 下舍入最接近的整数
// console.log(Math.floor(2.9))//2



// Math.sin()
// Math.sin(x) 返回角 x（以弧度计）的正弦（介于 -1 与 1 之间的值）。
// 如果您希望使用角度替代弧度，则需要将角度转换为弧度：
// Angle in radians = Angle in degrees x PI / 180.
// 实例
// Math.sin(90 * Math.PI / 180); // 返回 1（90 度的正弦）


// Math.cos()
// Math.cos(x) 返回角 x（以弧度计）的余弦（介于 -1 与 1 之间的值）。
// 如果您希望使用角度替代弧度，则需要将角度转换为弧度：
// Angle in radians = Angle in degrees x PI / 180.
// 实例
// Math.cos(0 * Math.PI / 180);     // 返回 1（0 度的余弦）


// Math.min() 和 Math.max()
// Math.min() 和 Math.max() 可用于查找参数列表中的最低或最高值：
// 实例
// Math.min(0, 450, 35, 10, -8, -300, -78);  // 返回 -300
// Math.max(0, 450, 35, 10, -8, -300, -78);  // 返回 450



// Math.E          // 返回欧拉指数（Euler's number）
// Math.PI         // 返回圆周率（PI）
// Math.SQRT2      // 返回 2 的平方根
// Math.SQRT1_2    // 返回 1/2 的平方根
// Math.LN2        // 返回 2 的自然对数
// Math.LN10       // 返回 10 的自然对数
// Math.LOG2E      // 返回以 2 为底的 e 的对数（约等于 1.414）
// Math.LOG10E     // 返回以 10 为底的 e 的对数（约等于0.434）

// Math 构造器
// 与其他全局对象不同，Math对象没有构造函数。方法和属性是静态的。
// 可以在不首先创建Math对象的情况下使用所有方法和属性（常量）。

// Math 方法
// abs(x)	返回 x 的绝对值
// acos(x)	返回 x 的反余弦值，以弧度计
// asin(x)	返回 x 的反正弦值，以弧度计
// atan(x)	以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
// atan2(y,x)	返回从 x 轴到点 (x,y) 的角度
// ceil(x)	对 x 进行上舍入
// cos(x)	返回 x 的余弦
// exp(x)	返回 Ex 的值
// floor(x)	对 x 进行下舍入
// log(x)	返回 x 的自然对数（底为e）
// max(x,y,z,...,n)	返回最高值
// min(x,y,z,...,n)	返回最低值
// pow(x,y)	返回 x 的 y 次幂
// random()	返回 0 ~ 1 之间的随机数
// round(x)	把 x 四舍五入为最接近的整数
// sin(x)	返回 x（x 以角度计）的正弦
// sqrt(x)	返回 x 的平方根
// tan(x)	返回角的正切



// Math.random()
// Math.random() 返回 0（包括） 至 1（不包括） 之间的随机数：
// 实例
// Math.random() 总是返回小于 1 的数。
// console.log(Math.random())
// console.log(Math.floor(Math.random() * 10))// 返回 0 至 9 之间的数
// console.log(Math.floor(Math.random() * 11))// 返回 0 至 10 之间的数


// 一个随机函数
// 正如你从上面的例子看到的，创建一个随机函数用于生成所有随机整数是一个好主意。

// 这个 JavaScript 函数始终返回介于 min（包括）和 max（包括）之间的随机数：
// function getRndInteger(min, max) {
//     return Math.floor(Math.random() * (max - min+1 ) + min;
// }
// console.log(getRndInteger(0,10))


// Boolean() 函数
// 您可以使用 Boolean() 函数来确定表达式（或变量）是否为真：
// 实例
// Boolean(10 > 9)        // 返回 true




// 条件（三元）运算符
// JavaScript 也包含了可基于某些条件向变量赋值的条件运算符。
// 语法
// variablename = (condition) ? value1:value2
// 实例
// var age=18;
// var voteable = (age < 18) ? "太年轻":"足够成熟";
// console.log(voteable)

// var day;
// switch (new Date().getDay()) {
//     case 0:
//         day = "星期天";
//         break;
//     case 1:
//         day = "星期一";
//          break;
//     case 2:
//         day = "星期二";
//          break;
//     case 3:
//         day = "星期三";
//          break;
//     case 4:
//         day = "星期四";
//          break;
//     case 5:
//         day = "星期五";
//          break;
//     case 6:
//         day = "星期六";
//      break;
//      default:
//      text = "期待周末~";
// } 
// console.log(day)

// 严格的比较
// Switch case 使用严格比较（===）。
// 值必须与要匹配的类型相同。
// 只有操作数属于同一类型时，严格比较才能为 true。


// continue 语句（不论有无标签引用）只能用于跳过一个迭代。
// break 语句，如果没有标签引用，只能用于跳出一个循环或一个 switch。
// 如果有标签引用，则 break 语句可用于跳出任意代码块：


// For/In 循环
// JavaScript for/in 语句遍历对象的属性：
// 实例
// var person = {fname:"Bill", lname:"Gates", age:62}; 
// var text = "";
// var x;
// for (x in person) {
//     text += person[x];
// }

// Number() 转换数值，String() 转换字符串，Boolean() 转换布尔值。


// 在字符串方法 search() 中使用正则表达式
// 实例
// 使用正则表达式执行搜索字符串中 "w3school" 的大小写不敏感的搜索：
// var str = "Visit W3School";
// var n = str.search(/w3school/i); 
// n 中的结果将是：6


// 在字符串方法 replace() 中使用正则表达式
// 实例
// 使用大小写不明的正则表达式以 W3school 来替换字符串中的 Microsoft：
// var str = "Visit Microsoft!";
// var res = str.replace(/microsoft/i, "W3School"); 
// res 的结果将是：Visit W3School!

// 正则表达式修饰符
// 修饰符可用于大小写不敏感的更全局的搜素：

// 修饰符	描述
// i	执行对大小写不敏感的匹配。	试一试
// g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
// m	执行多行匹配。

// 正则表达式模式
// 括号用于查找一定范围的字符串：
// 表达式	描述
// [abc]	查找方括号之间的任何字符。
// [0-9]	查找任何从 0 至 9 的数字。
// (x|y)	查找由 | 分隔的任何选项。

// 元字符（Metacharacter）是拥有特殊含义的字符：
// 元字符	描述
// \d	查找数字。
// \s	查找空白字符。
// \b	匹配单词边界。
// \uxxxx	查找以十六进制数 xxxx 规定的 Unicode 字符。

// Quantifiers 定义量词：
// 量词	描述
// n+	匹配任何包含至少一个 n 的字符串。
// n*	匹配任何包含零个或多个 n 的字符串。	
// n?	匹配任何包含零个或一个 n 的字符串。

// 使用 test()
// test() 是一个正则表达式方法。
// 它通过模式来搜索字符串，然后根据结果返回 true 或 false。
// var patt = /e/;
// patt.test("The best things in life are free!"); 
// or
// /e/.test("The best things in life are free!");


// 使用 exec()
// exec() 方法是一个正则表达式方法。
// 它通过指定的模式（pattern）搜索字符串，并返回已找到的文本。
// 如果未找到匹配，则返回 null。
// console.log(/e/.exec("The best things in life are free!"))



// try 语句使您能够测试代码块中的错误。
// catch 语句允许您处理错误。
// throw 语句允许您创建自定义错误。
// finally 使您能够执行代码，在 try 和 catch 之后，无论结果如何。
// try {
//     adddlert("欢迎您，亲爱的用户！");
// } catch (err) {
//     //...
//     document.getElementById('demo').innerHTML=err
// }


//finally 语句
// finally 语句允许您在 try 和 catch 之后执行代码，无论结果：

// try {
//      供测试的代码块
// }
//  catch(err) {
//      处理错误的代码块
// } 
// finally {
//      无论 try / catch 结果如何都执行的代码块
// }

// function myFunction() {
//     var message, x;
//     message = document.getElementById("p01");
//     message.innerHTML = "";
//     x = document.getElementById("demo").value;
//     try { 
//       if(x == "")  throw "是空的";
//       if(isNaN(x)) throw "不是数字";
//       x = Number(x);
//       if(x > 10)   throw "太大";
//       if(x < 5)  throw "太小";
//     }
//     catch(err) {
//       message.innerHTML = "输入：" + err;
//     }
//     finally {
//       document.getElementById("demo").value = "";
//     }
//   }
// myFunction()



// Error 对象
// JavaScript 拥有当错误发生时提供错误信息的内置 error 对象。
// error 对象提供两个有用的属性：name 和 message。

// Error 对象属性
// 属性	描述
// name	设置或返回错误名
// message	设置或返回错误消息（一条字符串）

// Error Name Values
// error 的 name 属性可返回六个不同的值：
// 错误名	描述
// EvalError	已在 eval() 函数中发生的错误
// RangeError	已发生超出数字范围的错误
// ReferenceError	已发生非法引用
// SyntaxError	已发生语法错误
// TypeError	已发生类型错误
// URIError	在 encodeURI() 中已发生的错误

// Eval 错误
// EvalError 指示 eval() 函数中的错误。
// 更新版本的 JavaScript 不会抛出任何 EvalError。请使用 SyntaxError 代替。

// 范围错误
// RangeError 会在您使用了合法值的范围之外的数字时抛出。
// 例如：您不能将数字的有效位数设置为 500。

// 引用错误
// 假如您使用（引用）了尚未声明的变量，则 ReferenceError 会被抛出：

// 类型错误
// 假如您使用的值不在期望值的范围之内，则 TypeError 被抛出：

// URI 错误
// 假如您在 URI 函数中使用非法字符，则 URIError 被抛出：

// 非标准的 Error 对象属性
// Mozilla 和 Microsoft 定义了非标准的 error 对象属性：
// fileName (Mozilla)
// lineNumber (Mozilla)
// columnNumber (Mozilla)
// stack (Mozilla)
// description (Microsoft)
// number (Microsoft)
// 请勿在公共网站使用这些属性。它们并不会在所有浏览器中工作