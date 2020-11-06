//没有class，用函数代替
// 首先JS连class关键字都没有，怎么办呢？用函数代替，JS中最不缺的就是函数，函数不仅能够执行普通功能，还能当class使用。比如我们要用JS建一个小狗的类怎么写呢？直接写一个函数就行：
// function puppy() {  }
// //使用new关键字创建实例
// const myPuppy=new puppy()
// // console.log(myPuppy)//puppy


// 函数本身就是构造函数
// 当做类用的函数本身也是一个函数，而且他就是默认的构造函数。我们想让Puppy函数能够设置实例的年龄，只要让他接收参数就行了。
function puppy(age) {
  this.puppyAge = age
}
const myPuppy = new puppy(3)
console.log(myPuppy.puppyAge) //3
//注意上面代码的this，被作为类使用的函数里面this总是指向实例化对象，也就是myPuppy。这么设计的目的就是让使用者可以通过构造函数给实例对象设置属性，这时候console出来看myPuppy.puppyAge就是3。\

//实例方法用prototype上面我们实现了类和构造函数，但是类方法呢？Java版小狗还可以“汪汪汪”叫呢，JS版怎么办呢？JS给出的解决方案是给方法添加一个prototype属性，
// 挂载在这上面的方法，在实例化的时候会给到实例对象。我们想要myPuppy能说话，就需要往Puppy.prototype添加说话的方法。

puppy.prototype.say = "汪汪汪"
//使用new关键字产生的实例都有类的prototype上的属性和方法，我们在Puppy.prototype上添加了say方法，myPuppy就可以说话了
console.log(myPuppy.say) //汪汪汪



//实例方法查找用__proto__

//这个对象上并没有say,say去哪了
console.log(myPuppy) //puppy {puppyAge: 3}
//这就该__proto__上场了，当你访问一个对象上没有的属性时，
// 比如myPuppy.say，对象会去__proto__查找。__proto__的值就等于父类的prototype, myPuppy.__proto__指向了Puppy.prototype。
console.log(myPuppy.__proto__ == puppy.prototype) //true
//如果你访问的属性在Puppy.prototype也不存在，那又会继续往Puppy.prototype.__proto__上找，这时候其实就找到了Object.prototype了，
// Object.prototype再往上找就没有了，也就是null，这其实就是原型链

//constructor
// 我们说的constructor一般指类的prototype.constructor。prototype.constructor是prototype上的一个保留属性，这个属性就指向类函数本身，用于指示当前类的构造函数。
console.log(puppy.prototype.constructor == puppy) //true



//静态方法
//JS中定义一个静态方法更简单，直接将它作为类函数的属性就行：
puppy.statciFunc = function () { //statciFunc就是一个静态方法
  console.log("我是静态方法，this拿不到实例对象")
}
//直接通过类名调用
puppy.statciFunc() //我是静态方法，this拿不到实例对象

//静态方法和实例方法最主要的区别就是实例方法可以访问到实例，可以对实例进行操作，而静态方法一般用于跟实例无关的操作。
// 这两种方法在jQuery中有大量应用，在jQuery中$(selector)其实拿到的就是实例对象，通过$(selector)进行操作的方法就是实例方法。
// 比如$(selector).append()，这会往这个实例DOM添加新元素，他需要这个DOM实例才知道怎么操作，将append作为一个实例方法，他里面的this就会指向这个实例，就可以通过this操作DOM实例。
// 那什么方法适合作为静态方法呢？比如$.ajax，这里的ajax跟DOM实例没关系，不需要这个this，可以直接挂载在$上作为静态方法


//实现一个new
//结合上面讲的，我们知道new其实就是生成了一个对象，这个对象能够访问类的原型，知道了原理，我们就可以自己实现一个new了。
// function newObj(e) {}
// const newObj1 = new newObj()
// console.log(newObj1)

function myNew(fun, ...args) {
  const obj = {} //创建一个空对象
  const result = fun.call(obj, ...args) //创建构造函数
  obj.prototype = fun.prototype //设置原型链
  // 注意如果原构造函数有Object类型的返回值，包括Functoin, Array, Date, RegExg, Error
  // 那么应该返回这个返回值
  let isObject = typeof result === 'object' && result !== null
  let isFunction = typeof result === 'function'
  if (isObject || isFunction) {
    return result
  }
  // 原构造函数没有Object类型的返回值，返回我们的新对象
  return obj
}

function pig(kind) {
  this.myKind = kind
}
pig.prototype.say=function () { 
  console.log("哼哼哼")
 }

const myPig = myNew(pig, "77")

console.log(myPig) //{myKind: "77", prototype: {…}}
myPig.prototype.say()//笨笨


//ES6的class
//最后还是提一嘴ES6的class，其实ES6的class就是前面说的函数类的语法糖，比如我们的Puppy用ES6的class写就是这样：
class SyntacticSugar{
  //构造函数
  constructor(age){
    this.myAge=age
  }
  //实例
  say(){
    console.log("汪汪汪")
  }
  //静态方法
  static myFunc(){
    console.log("我是静态方法，this拿不到实例对象")
  }
}
let mySyntacticSugar=new SyntacticSugar(2)
// console.log(mySyntacticSugar)
console.log(mySyntacticSugar.myAge)//2
mySyntacticSugar.say()//汪汪汪
SyntacticSugar.myFunc()//我是静态方法，this拿不到实例对象

//使用class可以让我们的代码看起来更像标准的面向对象，构造函数，实例方法，静态方法都有明确的标识。但是他本质只是改变了一种写法，
// 所以可以看做是一种语法糖，如果你去看babel编译后的代码，你会发现他其实也是把class编译成了我们前面的函数类，extends关键字也是使用我们前面的原型继承的方式实现的。




//总结
// 1、JS中的函数可以作为函数使用，也可以作为类使用
// 2、作为类使用的函数实例化时需要使用new
// 3、为了让函数具有类的功能，函数都具有prototype属性。
// 4、为了让实例化出来的对象能够访问到prototype上的属性和方法，实例对象的__proto__指向了类的prototype。所以prototype是函数的属性，不是对象的。对象拥有的是__proto__，是用来查找prototype的。
// 5、prototype.constructor指向的是构造函数，也就是类函数本身。改变这个指针并不能改变构造函数。
// 6、对象本身并没有constructor属性，你访问到的是原型链上的prototype.constructor。
// 7、函数本身也是对象，也具有__proto__，他指向的是JS内置对象Function的原型Function.prototype。所以你才能调用func.call,func.apply这些方法，你调用的其实是Function.prototype.call和Function.prototype.apply。
// 8、prototype本身也是对象，所以他也有__proto__，指向了他父级的prototype。__proto__和prototype的这种链式指向构成了JS的原型链。原型链的最终指向是Object的原型。Object上面原型链是null，即Object.prototype.__proto__ === null。
// 9、另外评论区有朋友提到：Function.__proto__ === Function.prototype。这是因为JS中所有函数的原型都是Function.prototype，也就是说所有函数都是Function的实例。Function本身也是可以作为函数使用的----Function()，所以他也是Function的一个实例。类似的还有Object，Array等，他们也可以作为函数使用:Object(), Array()。所以他们本身的原型也是Function.prototype，即Object.__proto__ === Function.prototype。换句话说，这些可以new的内置对象其实都是一个类，就像我们的Puppy类一样。
// 10、ES6的class其实是函数类的一种语法糖，书写起来更清晰，但原理是一样的。


