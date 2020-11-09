//this到底是啥其实this就是一个指针，它指示的就是当前的一个执行环境，可以用来对当前执行环境进行一些操作。
// 因为它指示的是执行环境，所以在定义这个变量时，其实是不知道它真正的值的，只有运行时才能确定他的值。同样一段代码，用不同的方式执行，他的this指向可能是不一样的

// function fun() {
//     this.myName = "小小彬"
//     console.log(this)
// }
//我们直接调用了func()，发现this指向的是window，myName属性添加到了window上。
// fun()//Window {window: Window, self: Window, document: document, name: "", location: Location, …}

// 我们换成new func()来调用：
//这时候方法里面this就指向了new返回的对象，而不是前面例子的window了。
// 这是因为当你使用new去调用一个方法时，这个方法其实就作为构造函数使用了，这时候的this指向的是new出来的对象。
//使用new调用时，this指向new出来的对象这个规则其实是JS面向对象的一部分，JS使用了一种很曲折的方式来支持面向对象。当你用new来执行一个函数时，这个函数就变成了一个类，new关键字会返回一个类的实例给你，这个函数会充当构造函数的角色。
// 作为面向对象的构造函数，必须要有能够给实例初始化属性的能力，所以构造函数里面必须要有某种机制来操作生成的实例，这种机制就是this。让this指向生成的实例就可以通过this来操作实例了
// new fun() //fun {myName: "小小彬"}


// 没有明确调用者时，this指向window
// 这个其实在最开始的例子就讲过了，那里没有明确调用者，this指向的是window。我们这里讲另外一个例子，函数里面的函数，this指向谁？
// function fun1() {
//     function fun2() {
//         console.log("this:", this)
//     }
//     fun2()
// }
// // fun1()//指向window
// new fun1() //还是指向window
//我们发现无论是直接执行，还是使用new执行，this的值都指向的window。
// 直接执行时很好理解，因为没有明确调用者，那this自然就是window。需要注意的是使用new时，只有被new的func才是构造函数，他的this指向new出来的对象，他里面的函数的this还是指向window。

// 有明确调用者时，this指向调用者
// const obj = {
//     myName:"小彬彬",
//     fun2: function () {
//         console.log(this.myName)
//     }
// }
// obj.fun2()//小彬彬
//上述例子很好理解，因为调用者是obj，所以fun2里面的this就指向obj，this.myName就是obj.myName。
// 其实这一条和上一条可以合在一起，没有明确调用者时其实隐含的调用者就是window，所以经常有人说this总是指向调用者。

//下面我们将这个例子稍微改一下：
// var myName="大彬彬"
// const obj={
//     myName:'小彬彬',
//     fun:function(){
//         console.log(this.myName)
//     }
// }
// const anotherFunc=obj.fun
// anotherFunc() //大彬彬
//这里的输出应该是“大飞哥”，因为虽然anotherFunc的函数体跟obj.func一样，
//但是他的执行环境不一样，他其实没有明确的调用者，或者说调用者是window。这里的this.myName其实是window.myName，也就是“大飞哥”。
//把var变成let，但是我们的输出却变成了undefined。这是因为let，const定义变量，即使在最外层也不会变成window的属性，只有var定义的变量才会成为window的属性。

//箭头函数并不会绑定this
//这句话的意思是箭头函数本身并不具有this，箭头函数在被申明确定this，这时候他会直接将当前作用域的this作为自己的this。还是之前的例子我们将函数改为箭头函数：
// var myName="大彬彬"
// const obj={
//     myName:'小彬彬',
//     fun:()=>{
//         console.log(this.myName)
//     }
// }
// const anotherFunc=obj.fun
// obj.fun()//大彬彬
// anotherFunc()//大彬彬
//上述代码里面的obj.func()输出也是“大飞哥”，是因为obj在创建时申明了箭头函数，这时候箭头函数会去寻找当前作用域，
// 因为obj是一个对象，并不是作用域，所以这里的作用域是window，this也就是window了。

// 再来看一个例子：
var myName = "大彬彬"
const obj = {
    myName: "小彬彬",
    fun: function () {
        return {
            getName: () => {
                console.log(this.myName)
            }
        }
    }
}

const anotherFunc = obj.fun().getName
obj.fun().getName() //小彬彬
anotherFunc() //小彬彬
//两个输出都是“小小飞”，obj.func().getName()输出“小彬彬”很好理解，这里箭头函数是在obj.func()的返回值里申明的，
// 这时他的this其实就是func()的this，因为他是被obj调用的，所以this指向obj。
// 那为什么anotherFunc()输出也是“小彬彬”呢？这是因为anotherFunc()输出的this，
// 其实在anotherFunc赋值时就确定了：var anotherFunc = obj.func().getName;
// 其实是先执行了obj.func()执行obj.func()的时候getName箭头函数被申明这时候箭头函数的this应该是当前作用域的this，
// 也就是func()里面的thisfunc()因为是被obj调用，所以this指向obj调用anotherFunc时，其实this早就确定了，也就是obj，最终输出的是obj.myName。

//var anotherFunc = obj.func().getName;其实是先执行了obj.func()
//执行obj.func()的时候getName箭头函数被申明
//这时候箭头函数的this应该是当前作用域的this，也就是func()里面的this
//func()因为是被obj
//调用，所以this指向obj调用anotherFunc时，其实this早就确定了，也就是obj，最终输出的是obj.myName。

function obj3() {
    this.myName = "小小彬"
    const getName = () => {
        console.log(this.myName)
    }
    getName()
}
new obj3() //小小彬
//这里输出的是“小小彬”，原理还是一样的，箭头函数在申明时this确定为当前作用域的this，
// 在这里就是func的作用域，跟func的this一样指向new出来的实例。如果不用new，而是直接调用，这里的this就指向window。


//DOM事件回调里面，this指向绑定事件的对象
function func2(e) {
    //currentTarget指的是绑定事件的DOM对象，target指的是触发事件的对象。DOM事件回调里面this总是指向currentTarget，
    //如果触发事件的对象刚好是绑定事件的对象，即target === currentTarget，this也会顺便指向target。如果回调是箭头函数，this是箭头函数申明时作用域的this。
    console.log(this === e.currentTarget) //true
    console.log(this === e.target) //true
}

const ele = document.getElementById('test')
ele.addEventListener('click', func2)


//严格模式下this是undefined
function func3() {
    "use strict"
    console.log(this)
}
func3() //undefined
//注意这里说的严格模式下this是undefined是指在函数体内部，如果本身就在全局作用域，this还是指向window。
var content = "小小彬";
"use strict"
console.log(content) //小小彬


//this能改吗
// this是能改的，call和apply都可以修改this，ES6里面还新增了一个bind函数。

// 使用call和apply修改this
const obj4 = {
    myName: "大飞哥",
    func: function (age, kind) {
        console.log(`我名字叫${this.myName},我今年${age}岁,我是${kind}`)
    }
}

const change = {
    myName: "小飞哥"
}
//注意上面输出的名字是"小小飞"，也就是obj2.myName。正常直接调用obj.func()输出的名字应该是obj.myName，也就是"大飞哥"。但是如果你使用call来调用，call的第一个参数就是手动指定的this。
// 我们将它指定为obj2，那在函数里面的this.myName其实就是obj2.myName了。
// obj4.func.call(obj2, 18, "帅哥") 我名字叫小飞哥,我今年18岁,我是帅哥

// apply方法跟call方法作用差不多，只是后面的函数参数形式不同，使用apply调用应该这样写，函数参数应该放到一个数组或者类数组里面：
obj4.func.apply(change, [18, "帅哥"]) //我名字叫小飞哥,我今年18岁,我是帅哥

//之所以有call和apply两个方法实现了差不多的功能，是为了让大家使用方便，
// 如果你拿到的参数是一个一个的，那就使用call吧，但是有时候拿到的参数是arguments，这是函数的一个内置变量，是一个类数组结构，表示当前函数的所有参数，那就可以直接用apply，而不用将它展开了。


//使用bind修改this
// bind是ES5引入的一个方法，也可以修改this，但是调用它并不会立即执行方法本身，而是会返回一个修改了this的新方法：
const obj5 = {
    myName: "大大彬",
    func: function (age) {
        console.log(`我的名字叫做${this.myName},我今年${age}岁了`)
    }
}
const result = {
    myName: "小小彬"
}

//bind和call，apply最大的区别就是call，apply会立即执行方法，而bind并不会立即执行，而是会返回一个新方法供后面使用。
const funcBind = obj5.func.bind(result)
funcBind(18) //我的名字叫做小小彬,我今年18岁了


//自己写一个call
Function.prototype.myCall = function (...args) {
    // 参数检查
    if (typeof this !== "function") {
        throw new Error('Must call with a function');
    }

    const realThis = args[0] || window;
    const realArgs = args.slice(1);
    const funcSymbol = Symbol('func');
    realThis[funcSymbol] = this; // 这里的this是原方法，保存到传入的第一个参数上

    //用传入的参数来调方法，方法里面的this就是传入的参数了
    const res = realThis[funcSymbol](...realArgs);

    delete realThis[funcSymbol]; // 最后删掉临时存储的原方法

    return res; // 将执行的返回值返回
}

//自己写一个apply
//apply方法跟call方法很像，区别只是在取调用参数上：
Function.prototype.myApply = function (...args) {
    if (typeof this !== "function") {
        throw new Error('Must call with a function');
    }

    const realThis = args[0] || window;
    // 直接取第二个参数，是一个数组
    const realArgs = args[1];
    const funcSymbol = Symbol('func');
    realThis[funcSymbol] = this;

    const res = realThis[funcSymbol](...realArgs);

    delete realThis[funcSymbol];

    return res;
}

//自己写一个bind
// 自己写一个bind需要用到前面的apply，注意他的返回值是一个方法Function.prototype.myBind = function(...args) {
Function.prototype.myBind = function (...args) {
    if (typeof this !== "function") {
        throw new Error('Must call with a function');
    }

    const _func = this; // 原方法
    const realThis = args[0] || window; // 绑定的this
    const otherArgs = args.slice(1); // 取出后面的参数作为新函数的默认参数

    return function (...args2) { // 返回一个方法
        return _func.apply(realThis, [...otherArgs, ...args2]); // 拼接存储参数和新参数，然后用apply执行
    }
}

//总结
// 函数外面的this，即全局作用域的this指向window。
// 函数里面的this总是指向直接调用者。如果没有直接调用者，隐含的调用者是window。
// 使用new调用一个函数，这个函数即为构造函数。构造函数里面的this是和实例对象沟通的桥梁，他指向实例对象。
// 箭头函数里面的this在它申明时确定，跟他当前作用域的this一样。
// DOM事件回调里面，this指向绑定事件的对象(currentTarget)，而不是触发事件的对象(target)。当然这两个可以是一样的。如果回调是箭头函数，请参考上一条，this是它申明时作用域的this。
// 严格模式下，函数里面的this指向undefined，函数外面(全局作用域)的this还是指向window。
// call和apply可以改变this，这两个方法会立即执行原方法，他们的区别是参数形式不一样。bind也可以修改this，但是他不会立即执行，而是返回一个修改了this的函数。