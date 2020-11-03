//继承
// 一、 构造函数绑定
// 最简单的方法，使用call或apply方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：
// function Animal() {
//     this.species = "猪科"
// }


// function Cat(name, IQ) {
//     Animal.apply(this, arguments)
//     this.name = name
//     this.IQ = IQ
// }
// var Cat1 = new Cat("77", "笨笨") //name:77;IQ：笨笨

// console.log(Cat1)
// console.log(Cat1.species) //猪科


// 二、 prototype模式
// 第二种方法更常见，使用prototype属性。
function Animal() {
    this.species = "猪";
}

function Cat(name, color) {
    this.name = name;
    this.color = color;
}
Cat.prototype = new Animal()
Cat.prototype.constructor = Cat() //把Cat.prototype.constructor的属性重新指向Cat()

var Cat1 = new Cat("77", "白色")
console.log(Cat1)

console.log(Cat.prototype.constructor == Cat()) //true

// 代码的第一行， 我们将Cat的prototype对象指向一个Animal的实例。
// Cat.prototype = new Animal();

// 它相当于完全删除了prototype 对象原先的值， 然后赋予一个新值。 但是， 第二行又是什么意思呢？
// Cat.prototype.constructor = Cat;

// 原来， 任何一个prototype对象都有一个constructor属性， 指向它的构造函数。 如果没有 "Cat.prototype = new Animal();"
// 这一行， Cat.prototype.constructor是指向Cat的； 加了这一行以后， Cat.prototype.constructor指向Animal。


// 更重要的是， 每一个实例也有一个constructor属性， 默认调用prototype对象的constructor属性。
// alert(cat1.constructor == Cat.prototype.constructor); // true

// 因此， 在运行 "Cat.prototype = new Animal();"
// 这一行之后， cat1.constructor也指向Animal！
// alert(cat1.constructor == Animal); // true


// 这显然会导致继承链的紊乱（ cat1明明是用构造函数Cat生成的）， 因此我们必须手动纠正， 将Cat.prototype对象的constructor值改为Cat。 这就是第二行的意思。
// 这是很重要的一点， 编程时务必要遵守。 下文都遵循这一点， 即如果替换了prototype对象，
// o.prototype = {};

// 那么， 下一步必然是为新的prototype对象加上constructor属性， 并将这个属性指回原来的构造函数。
// o.prototype.constructor = o;