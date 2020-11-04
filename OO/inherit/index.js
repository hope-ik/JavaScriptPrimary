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
// function Animal() {
//     this.species = "猪";
// }

// function Cat(name, color) {
//     this.name = name;
//     this.color = color;
// }
// Cat.prototype = new Animal()
// Cat.prototype.constructor = Cat() //把Cat.prototype.constructor的属性重新指向Cat()

// var Cat1 = new Cat("77", "白色")
// console.log(Cat1)

// console.log(Cat.prototype.constructor == Cat()) //true

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




//三、 直接继承prototype

// 第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。
// function Animal() {}
// //添加属性
// Animal.prototype.species = "猪"

// function Cat(name, IQ) {
//     this.name = name
//     this.IQ = IQ
// }
// //直接继承Animal的属性

// 与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。
// 缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype

// Cat.prototype = Animal.prototype
// //constructor重新指回原来的构造函数

//这一句实际上把Animal.prototype对象的constructor属性也改掉了！
// Cat.prototype.constructor = Cat
// console.log(Animal.prototype.constructor==Cat)//true

// var cat1 = new Cat("77", "笨笨")
// console.log(cat1)



//四、 利用空对象作为中介

// 由于"直接继承prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。
// function Animal() {
//     this.species = "猪";
// }

// function Cat(name, color) {
//     this.name = name;
//     this.color = color;
// }
// //F是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。
// var F = function () {}
// F.prototype = Animal.prototype
// Cat.prototype = new F()
// Cat.prototype.constructor = Cat
// console.log(Animal.prototype.constructor == Animal) //true



//将上面的方法，封装成一个函数，便于使用

// function extend(Child, Parent) {
//     var F = function () {};
//     F.prototype = Parent.prototype;
//     Child.prototype = new F();
//     Child.prototype.constructor = Child;

//     //意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。
//     //这等于在子对象上打开一条通道，可以直接调用父对象的方法
//     Child.uber = Parent.prototype;

// }
// function Animal() {}
// Animal.prototype.species = "猪"

// function Cat(name, color) {
//     this.name = name
//     this.color = color
// }

// //使用
// extend(Cat, Animal);
// var cat1 = new Cat("77", "黄色");

// console.log(cat1.species); // 猪
// console.log(Cat.prototype)//Animal对象



// 五、 拷贝继承

// 上面是采用prototype对象，实现继承。也可以换一种思路，纯粹采用"拷贝"方法实现继承。简单说，如果把父对象的所有属性和方法，拷贝进子对象。

// function Animal() {}
// Animal.prototype.species = "猪"

// function extend2(child, parent) {
//     var p = parent.prototype
//     var c = child.prototype
//     for (var i in p) {
//         c[i] = p[i]
//     }
//     c.uber = p
// }

// //这个函数的作用，就是将父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象
// extend2(Pig,Animal)
// function Pig(name,personality) {
//     this.name=name
//     this.personality=personality
// }

// var Pig1=new Pig("77","cute")
// console.log(Pig1)//拷贝的父对象的属性




// 非构造函数的继承

//现在有一个对象，叫做"中国人"。
var Chinese = {
    nation: '中国'
};

// 还有一个对象，叫做"医生"。
var Doctor = {
    career: '医生'
}


//二、object()方法

//这个object()函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。

//第一步先在父对象的基础上，生成子对象：
// var Doctor=Object(Chinese)
// //然后，再加上子对象本身的属性：
// Doctor.career="医生"
// //这时，子对象已经继承了父对象的属性了。
// console.log(Doctor.nation)//中国



//三、浅拷贝

// 除了使用"prototype链"以外，还有另一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。
// function extendCopy(e) {
//     var c={}
//     for(var i in e){
//         c[i]=e[i]
//     }
//     return c
// }
// var Chinese=extendCopy(Chinese)
// Chinese.career="医生"
// console.log(Chinese)


// //但是，这样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。

// //给Chinese添加一个"出生地"属性，它的值是一个数组。
// Chinese.birthplace=["北京","上海","杭州"]

// //通过extendCopy()函数，Doctor继承了Chinese。
// var Doctor=extendCopy(Chinese)

// //然后，我们为Doctor的"出生地"添加一个城市：
// Doctor.birthplace.push("深圳")
// console.log(Doctor.birthplace)// ["北京", "上海", "杭州", "深圳"]

// //Chinese的"出生地"也被改掉了！
// console.log(Chinese.birthplace)//["北京", "上海", "杭州", "深圳"]





//四、深拷贝

//所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了。
function deepCopy(p, e) {
    var c = e || {}
    for (let i in p) {
        if (typeof p[i] === "object") {
            c[i] = p[i].constructor === Array ? [] : {}
            deepCopy(p[i], c[i])
        } else {
            c[i] = p[i]
        }
    }
    return c
}
Chinese.birthPlaces = ['北京', '上海', '香港'];

var Doctor = deepCopy(Chinese)

Doctor.birthPlaces.push('深圳');
console.log(Doctor) //["北京", "上海", "香港", "深圳"]
console.log(Chinese) //["北京", "上海", "香港"]