//JavaScript 函数作用域
// 在 JavaScript 中有两种作用域类型：
// 局部作用域
// 全局作用域
// JavaScript 拥有函数作用域：每个函数创建一个新的作用域。
// 作用域决定了这些变量的可访问性（可见性）。
// 函数内部定义的变量从函数外部是不可访问的（不可见的）。

// 局部 JavaScript 变量
// 在 JavaScript 函数中声明的变量，会成为函数的局部变量。
// 局部变量的作用域是局部的：只能在函数内部访问它们。
//实例
// function test() { 
//     var className="hello"
//     //这可使用className变量
//  }

// 全局 JavaScript 变量
// 函数之外声明的变量，会成为全局变量。
// 全局变量的作用域是全局的：网页的所有脚本和函数都能够访问它。
//实例
// var className = "hello"
// //此处可使用className变量
// function test() {

//     //此处也可使用className变量
// }

//HTML 中的全局变量
// 通过 JavaScript，全局作用域形成了完整的 JavaScript 环境。
// 在 HTML 中，全局作用域是 window。所有全局变量均属于 window 对象。
// var className="hello"
// window.className


// JavaScript 变量的有效期
// JavaScript 变量的有效期始于其被创建时。
// 局部变量会在函数完成时被删除。
// 全局变量会在您关闭页面是被删除。

// 函数参数
// 函数参数也是函数内的局部变量。


// 提升（Hoisting）是 JavaScript 将声明移至顶部的默认行为。
// JavaScript 声明会被提升
// 在 JavaScript 中，可以在使用变量之后对其进行声明。

// 换句话说，可以在声明变量之前使用它。

// let 和 const 关键字
// 用 let 或 const 声明的变量和常量不会被提升！

// 声明严格模式
// 通过在脚本或函数的开头添加 "use strict"; 来声明严格模式。

// 在脚本开头进行声明，拥有全局作用域（脚本中的所有代码均以严格模式来执行）：
// "use strict"
// x = 3.14;  //引发错误 因为x未声明

// 在函数中声明严格模式，拥有局部作用域（只有函数中的代码以严格模式执行）：
// x = 3.14; // 这不会引发错误
// myFunction();

// function myFunction() {
//     "use strict";
//     y = 3.14; // 这会引发错误
// }

// this 是什么？
// JavaScript this 关键词指的是它所属的对象。

// 它拥有不同的值，具体取决于它的使用位置：

// 在方法中，this 指的是所有者对象。
// 单独的情况下，this 指的是全局对象。
// 在函数中，this 指的是全局对象。
// 在函数中，严格模式下，this 是 undefined。
// 在事件中，this 指的是接收事件的元素。
// 像 call() 和 apply() 这样的方法可以将 this 引用到任何对象


// 方法中的 this
// 在对象方法中，this 指的是此方法的“拥有者”。
// 在下面例子中，this 指的是 person 对象。
// person 对象是 fullName 方法的拥有者。
// var person = {
//     firstName: "Bill",
//     lastName: "Gates",
//     id: 678,
//     fullName: function () {
//         return this.firstName + " " + this.lastName;
//     }
// };

//单独的 this
// 在单独使用时，拥有者是全局对象，因此 this 指的是全局对象。

// 在浏览器窗口中，全局对象是 [object Window]：
// var x=this
// console.log(x)//window{}


//在 JavaScript 函数中，函数的拥有者默认绑定 this。

//因此，在函数中，this 指的是全局对象 [object Window]。
// function myFunction() { 
//     return this
//  }
//  console.log(myFunction())//window{}

//函数中的 this（严格模式）
// JavaScript 严格模式不允许默认绑定。

// 因此，在函数中使用时，在严格模式下，this 是未定义的（undefined）。
// "use strict";
// function myFunction() {
//   return this;
// }//undefined


// 事件处理程序中的 this
// 在 HTML 事件处理程序中，this 指的是接收此事件的 HTML 元素：
// {/* <button onclick="this.style.display='none'">
//   点击来删除我！
// </button> */}


//对象方法绑定
// 在此例中，this 是 person 对象（person 对象是该函数的“拥有者”）：

// var person = {
//     firstName  : "Bill",
//     lastName   : "Gates",
//     id         : 678,
//     myFunction : function() {
//       return this;
//     }
//   };

// var person = {
//     firstName: "Bill",
//     lastName : "Gates",
//     id       : 678,
//     fullName : function() {
//       return this.firstName + " " + this.lastName;
//     }
//   };
//换句话说，this.firstName 意味着 this（person）对象的 firstName 属性。


// 显式函数绑定
// call() 和 apply() 方法是预定义的 JavaScript 方法。

// 它们都可以用于将另一个对象作为参数调用对象方法。

// 您可以在本教程后面阅读有关 call() 和 apply() 的更多内容。

// 在下面的例子中，当使用 person2 作为参数调用 person1.fullName 时，this 将引用 person2，即使它是 person1 的方法：
// var person1 = {
//     fullName: function() {
//       return this.firstName + " " + this.lastName;
//     }
//   }
//   var person2 = {
//     firstName:"Bill",
//     lastName: "Gates",
//   }
//   person1.fullName.call(person2);  // 会返回 "Bill Gates"


//JavaScript 最佳实践

// 请勿使用 new Object()
// 请使用 {} 来代替 new Object()
// 请使用 "" 来代替 new String()
// 请使用 0 来代替 new Number()
// 请使用 false 来代替 new Boolean()
// 请使用 [] 来代替 new Array()
// 请使用 /()/ 来代替 new RegExp()
// 请使用 function (){}来代替 new Function()

//意识到自动类型转换
// 请意识到数值会被意外转换为字符串或 NaN（Not a Number）。

// JavaScript 属于松散类型。变量可包含不同的数据类型，并且变量能够改变其数据类型：

//使用 === 比较
// == 比较运算符总是在比较之前进行类型转换（以匹配类型）。

// === 运算符会强制对值和类型进行比较：


//用 default 来结束 switch
// 请使用使用 default 来结束您的 switch 语句。即使您认为没有这个必要。


//避免使用 eval()
// eval() 函数用于将文本作为代码来允许。在几乎所有情况下，都没有必要使用它。

// 因为允许任意代码运行，它同时也意味着安全问题。

//延迟 JavaScript 加载
// 请把脚本放在页面底部，使浏览器首先加载页面。

// 脚本在下载时，浏览器不会启动任何其他的下载。此外所有解析和渲染活动都可能会被阻塞。

// HTTP 规范定义浏览器不应该并行下载超过两种要素。

// 一个选项是在 script 标签中使用 defer="true"。defer 属性规定了脚本应该在页面完成解析后执行，但它只适用于外部脚本。

// 如果可能，您可以在页面完成加载后，通过代码向页面添加脚本：

//实例
// {/* <script>
// window.onload = downScripts;

// function downScripts() {
//     var element = document.createElement("script");
//     element.src = "myScript.js";
//     document.body.appendChild(element);
// }
// </script> */}
//

//JavaScript 保留词
// 在 JavaScript 中，您不能把这些保留词作为变量、标记或函数名来使用：

// abstract	arguments	await*	boolean
// break	byte	case	catch
// char	class*	const	continue
// debugger	default	delete	do
// double	else	enum*	eval
// export*	extends*	false	final
// finally	float	for	function
// goto	if	implements	import*
// in	instanceof	int	interface
// let*	long	native	new
// null	package	private	protected
// public	return	short	static
// super*	switch	synchronized	this
// throw	throws	transient	true
// try	typeof	var	void
// volatile	while	with	yield
// 用星号标记的关键词是 ECMAScript 5 和 6 中的新词。



// JavaScript 保留词

//被删除的保留词
// 以下保留词已被从 ECMAScript 5/6 标准中删除：

// abstract	boolean	byte	char
// double	final	float	goto
// int	long	native	short
// synchronized	throws	transient	volatile
// 请不要将这些保留词用作变量。并非所有浏览器都完全支持 ECMAScript 5/6。


//JavaScript 对象、属性和方法
// 您还应该避免使用 JavaScript 内建对象的名称、属性和方法：

// Array	Date	eval	function
// hasOwnProperty	Infinity	isFinite	isNaN
// isPrototypeOf	length	Math	NaN
// name	Number	Object	prototype
// String	toString	undefined	valueOf


//Java 保留词
// JavaScript 常与 Java 一起使用。您应该避免把某些 Java 对象和属性用作 JavaScript 标识符：

// getClass	java	JavaArray	javaClass
// JavaObject	JavaPackage


//其他保留词
// JavaScript 能够在很多应用程序中被用作编程语言。

// 您还应该避免使用 HTML 和 Window 对象和属性的名称：

// alert	all	anchor	anchors
// area	assign	blur	button
// checkbox	clearInterval	clearTimeout	clientInformation
// close	closed	confirm	constructor
// crypto	decodeURI	decodeURIComponent	defaultStatus
// document	element	elements	embed
// embeds	encodeURI	encodeURIComponent	escape
// event	fileUpload	focus	form
// forms	frame	innerHeight	innerWidth
// layer	layers	link	location
// mimeTypes	navigate	navigator	frames
// frameRate	hidden	history	image
// images	offscreenBuffering	open	opener
// option	outerHeight	outerWidth	packages
// pageXOffset	pageYOffset	parent	parseFloat
// parseInt	password	pkcs11	plugin
// prompt	propertyIsEnum	radio	reset
// screenX	screenY	scroll	secure
// select	self	setInterval	setTimeout
// status	submit	taint	text
// textarea	top	unescape	untaint
// window


//HTML 事件处理程序
// 此外您应该避免使用所有 HTML 事件处理程序的名称。
// 例如：

// onblur	onclick	onerror	onfocus
// onkeydown	onkeypress	onkeyup	onmouseover
// onload	onmouseup	onmousedown	onsubmit



//JavaScript JSON
// JSON 是存储和传输数据的格式。
// JSON 经常在数据从服务器发送到网页时使用。

// 什么是 JSON？
// JSON 指的是 JavaScript Object Notation
// JSON 是轻量级的数据交换格式
// JSON 独立于语言 *
// JSON 是“自描述的”且易于理解
// * JSON 的语法是来自 JavaScript 对象符号的语法，但 JSON 格式是纯文本。读取和生成 JSON 数据的代码可以在任何编程语言编写的。

// JSON 实例
// JSON 语法定义了一个雇员对象：包含三条员工记录的数组（对象）：

// JSON 实例
// {
// "employees":[
//     {"firstName":"Bill", "lastName":"Gates"}, 
//     {"firstName":"Steve", "lastName":"Jobs"},
//     {"firstName":"Alan", "lastName":"Turing"}
// ]
// }

//JSON 格式评估为 JavaScript 对象
// JSON 格式在语法上与创建 JavaScript 对象的代码相同。

// 由于这种相似性，JavaScript 程序可以很容易地将 JSON 数据转换成本地的 JavaScript 对象。

// JSON 语法规则
// 数据是名称/值对
// 数据由逗号分隔
// 花括号保存对象
// 方括号保存数组


//JSON 数据 - 名称和值
// JSON 数据的书写方式是名称/值对，类似 JavaScript 对象属性。

// 名称/值对由（双引号中的）字段名构成，其后是冒号，再其后是值：
// "firstName":"Bill"
// JSON 名称需要双引号。JavaScript 名称不需要。


// JSON 对象
// JSON 对象是在花括号内书写的。

// 类似 JavaScript，对象能够包含多个名称/值对：

// {"firstName":"Bill", "lastName":"Gates"} 


//JSON 数组
// JSON 数组在方括号中书写。

// 类似 JavaScript，数组能够包含对象：

// "employees":[
//     {"firstName":"Bill", "lastName":"Gates"}, 
//     {"firstName":"Steve", "lastName":"Jobs"}, 
//     {"firstName":"Alan", "lastName":"Turing"}
// ]
// 在上面的例子中，对象 "employees" 是一个数组。它包含了三个对象。

// 每个对象代表一个人的一条记录（带有名和姓）。


// 把 JSON 文本转换为 JavaScript 对象
// JSON 的通常用法是从 web 服务器读取数据，然后在网页中显示数据。
// 为了简单起见，可以使用字符串作为输入演示。
// 首先，创建包含 JSON 语法的 JavaScript 字符串：

// var text = '{ "employees" : [' +
// '{ "firstName":"Bill" , "lastName":"Gates" },' +
// '{ "firstName":"Steve" , "lastName":"Jobs" },' +
// '{ "firstName":"Alan" , "lastName":"Turing" } ]}';
// 然后，使用 JavaScript 的内建函数 JSON.parse() 来把这个字符串转换为 JavaScript 对象：

// var obj = JSON.parse(text);
// 最后，请在您的页面中使用这个新的 JavaScript 对象：

// 实例
// <p id="demo"></p>
// <script>
// document.getElementById("demo").innerHTML =
// obj.employees[1].firstName + " " + obj.employees[1].lastName;
// </script> 