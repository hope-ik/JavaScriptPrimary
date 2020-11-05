//浅拷贝
// var a={value:1};
// var b=a;
// b.value=10;
// console.log(a.value,b.value)//10,10
// 我们发现改变b.value的时候，a.value的值也跟着变了，这是因为JS里面的对象是引用类型，我们在把变量a赋值给变量b的时候，赋值过去的其实是a的引用地址，
// b有了相同的引用地址，那a跟b指向的都是同一块内存空间，操作b的属性，其实就是操作了这块内存，因为a也指向这块内存，所以a的属性也变了。这其实就是一个浅拷贝。


//
let target = {
    name: 'John',
    age: 20,
    friend: {
        name: 'Michel',
        age: 30
    }
}

//我们可以直接遍历target对象，将它赋给一个新对象就行。
const shallowCopy = (obj) => {
    //判断参数是数组还是对象
    const result = Array.isArray(obj) ? [] : {}
    for (let i in obj) {
        // 使用hasOwnProperty来判断是否是自身属性
        // 只拷贝自身属性，不拷贝原型链上的属性，即继承属性
        if (obj.hasOwnProperty(i)) {
            result[i] = obj[i]
        }

    }
    return result
}

let newObj = shallowCopy(target)
newObj.age = 50
console.log(newObj.age, target.age) //50,20 原对象未改变

newObj.friend.age = 50
console.log(target.friend.age, newObj.friend.age) //50,50 改变里边对象发现原对象数据也改变了
//发现当我们改变newObj.friend的属性的时候，原对象的newObj.friend的属性也改变了，这是因为target.friend本身也是一个对象，
//我们拷贝的时候只拷贝了他的引用地址，所以我们通过newObj操作他的时候也改变了原来的target。

// 从上面可以看出我们的shallowCopy方法只拷贝了对象的一层，这也是一种浅拷贝。其实还有一些原生方法也是只拷贝一层的，比如Object.assign和...扩展运算符

let freshObj = Object.assign({}, target)
// console.log(freshObj)
let freshObj2 = {
    ...target
}
// console.log(freshObj2)


// 深拷贝
// JSON
//最简单的实现方法就是用JSON.stringify先将对象转换为字符串，然后再用JSON.parse重新解析为JSON，这样新生成的对象与原对象就完全没有关系了，还是以前面的target为例：
let JsonCopy = JSON.parse(JSON.stringify(target))
JsonCopy.friend.age = 100
// console.log(JsonCopy.friend.age,target.friend.age)//100,50


//换一个数据
let target2 = {
    name: 'John',
    age: 20,
    friend: {
        name: 'Michel',
        age: 30
    },
    dirFn: () => {},
    Undefin: undefined
}

let JsonCopy2 = JSON.parse(JSON.stringify(target2))
// console.log(JsonCopy2)//我们发现drive和girlFriend两个属性都丢了，这是因为JSON.stringify不能将方法和undefined属性转化为字符串，在转换为字符串过程中就丢了，再解析回来自然也没有了

//递归遍历
const deepCopy = (obj) => {
    const result = Array.isArray(obj) ? [] : {}
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            // 如果属性也是对象，递归调用自身
            if (obj[i] && typeof obj[i] === 'object') {
                result[i] = deepCopy(obj[i])
            } else {
                result[i] = obj[i]
            }
        }
    }
    return result
}

let deepObj = deepCopy(target2)
console.log(deepObj)//成功把方法与属性拷贝


//使用唯一标识属性Symbol试试

 let target3={
     [Symbol("name")]:"jojo",
     age:25,
     friend: {
        name: 'Michel',
        age: 30
    },
    dirFn: () => {},
    Undefin: undefined
 }

let deepObj2=deepCopy(target3)//发现Symbol属性不见了
// console.log(deepObj2)

//我们发现Symbol属性丢了，那怎么办呢？这个原因是for...in...循环拿不到Symbol属性，如果要拿Symbol属性，
//我们可以用Object.getOwnPropertySymbols和Reflect.ownKeys。Object.getOwnPropertySymbols会返回对象的Symbol属性列表：
//  console.log(Object.getOwnPropertySymbols(target3))

//Reflect.ownKeys会返回对象的所有自有属性，包括Symbol属性和不可枚举属性，但是不包括继承属性。所以我们的deepCopy方法改为：

const deepCopy2 = (obj) => {
    const result = Array.isArray(obj) ? [] : {}
    for (let i of Reflect.ownKeys(obj)) {
        if (obj.hasOwnProperty(i)) {
            // 如果属性也是对象，递归调用自身
            if (obj[i] && typeof obj[i] === 'object') {
                result[i] = deepCopy(obj[i])
            } else {
                result[i] = obj[i]
            }
        }
    }
    return result
}

let deepObj3=deepCopy2(target3)//成功取到对象所有的自有属性
// console.log(deepObj3)

