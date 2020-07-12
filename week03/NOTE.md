### JavaScript

- Atom

  | Grammar         | Runtime           |
  | --------------- | ----------------- |
  | Literal         | Types             |
  | Variable        | Execution Context |
  | Keywords        |                   |
  | Whitespace      |                   |
  | Line Terminator |                   |

  

- Expression

  | Grammar                                | Runtime         |
  | -------------------------------------- | --------------- |
  | Grammar Tree vs Priority /praɪˈɔːrəti/ | Type Convertion |
  | Left hand side & Right hand side       | Reference       |

- Statement

  | Grammar  | Runtime             |
  | -------- | ------------------- |
  | 简单语句 | Completion Record   |
  | 组合语句 | Lexical Environment |
  | 声明     |                     |

    

- Structure

- Program/Module

### 2. Expression

- MemberExpression

  - a.b
  - a[b]
  - foo`string`
  - super.b
  - super['b']
  - new.target
  - new Foo()

- NewExpression

  - new Foo

    ```javascript
    Example:
    new a()()  // new a() => new a()()
    new new a()  // new a() => new new a()
    ```

- ReferenceObject

  - Object
- Key
  
- delete
  - assign
  
  ```javascript
  a.b 访问对象的属性
  但是它从属性取出来的可不是属性的值，它取出来的是一个引用包括 Object(a) 和 Key (b)
  delete 删除时需要知道删除的是哪一个对象的哪一个属性
  assign 赋值时需要知道把一个值赋值给哪一个对象的哪一个属性
  
  ```
  
- CallExpression

  - foo()

  - super()

  - foo()['b']

  - foo().b

  - foo()`abc`

    ```javascript
    Example
    new a()['b'];  // new a() => new a()['b'] new出来的一个a 对象访问b属性
    
    1. 最基础的callExpression就是一个函数后面跟了一对圆括号，他的优先级要低于new 同
    时也低于Member 运算，但是在括号之后加上取属性，比如[], .b, `abc`,那么他会让表达
    式降级为call Expression，也就是后面的点运算他的优先级也降低了。
    
    语法结构能够表达的是要多于运算符优先级所能表达的，像这种点运算它本身就可以有不同的优先级，它是它前面的语法结构来决定自己的优先级
    ```

- Left Handside & Right Handside 

  ```javascript
  Example:
  a.b = c  // 正确写法 a.b是左值表达式
  a+b = c  // 错误写法 a+b是右值表达式 
  在JavaScript中 Left Handside 一定是 Right Handside 
  ```

- Update：（Right Handside）

  - a ++

  - a --

  - a --

  - ++a

    ```javascript
    Example:
    ++a++
    ++(a++)
    ```

- Unary：单目运算符

  - delete a.b

  - void foo()

  - typeof a

  - +a

    ```javascript
    如果a不是数字会发生类型转换
    ```

    

  - -a

  - ~a

    ```javascript
    ~位运算：把一个整数按位取反，如果不是整数呢，那么它就会强制转换为整数
    ```

    

  - !a

  - await a

- Exponental

  - **(唯一一个有结合的运算符表示乘方)

    ```javascript
    Example:
    3**2**3
    // 3**(2**3)
    ```

- Multipli ative

  - (*， / ，%)

- Additive

  - (+， -)

- Shift

  - << ，>>， >>>

- Relationship

  - < ，> ，<= ，>= indtanceof in

- Equality

  - ==
  - !=
  - ===
  - !==

- Bitwise

  - & ^ |

- Logical

  - &&

  - ||

    ```javascript
    也叫短路运算符
    ```

    

- Conditional

  - ? ：

    ```javascript
    也有短路逻辑
    ```



### 3.   Type Convertion

- Unboxing

  - ToPremitive
  - toString vs valueOf
  - Symbol.toPrimitive

  ```javascript
  var o = {
      toString(){return "2"},
      valueOf(){return 1},
      [Symbol.toPrimitive](){return 3}
  }
  var x = {}
  x[o] = 1
  console.log("x" + o)
  
  // 1. 如果定义了toPrimitive会忽略toString和valueOf
  // 2. 如果没有toPrimitive加法优先调用valueOf
  // 3. 如果没有toPrimitive和valueOf 就会调用toString
  
  转number优先调用valueOf
  转string优先调用toString
  ```

- Boxing

  | 类型    | 对象                    | 值          |
  | ------- | ----------------------- | ----------- |
  | Number  | new Number(1)           | 1           |
  | String  | new String("a")         | "a"         |
  | Boolean | new Boolean(true)       | true        |
  | Symbol  | new Object(Symbol("a")) | Symbol("a") |

  ```javascript
  完成 StringToNumber 和 NumberToString 两个函数
  ```

  

  

### 4. Satement

```javascript
if(x == 1)
    return 10;
// 以上语句执行结果 有可能有retrun 也可能没有return取决于 x 具体的值，
// 所以对于我们运行时来说，js引擎就是解析if 的语句的时候，
// 就需要知道完成之后到底是怎么完成的
// 于是js语言里面就需要一种数据结构来存储语句的完成的结果
// 这就是我们的 Completion Record类型了

我们需要一个数据结构来描述语句的执行结果：是否返回了？返回值是啥？等等....

```

- Completion Record

  - [[type]]: normal, break, continue, return, or throw
  - [[value]]: 基本类型
  - [[target]]: label

- 简单语句

  - ExpressionStatement
  - Emptystatement
  - DebuggerStatement
  - ThrowStatement
  - ContinueStatement
  - BreakStatement
  - RetrunStatement

- 复合语句

  - BlockStatement

    ```javascript
    {
        ...
    }
    // 一个大括号中间是语句列表
    ```

    - [[type]]: normal
    - [[value]]: --
    - [[target]]: --

  - IfStatement

  - SwitchStatement

    ```javascript
    // 在js中不建议使用，用if代替
    // 在c/c++中使用可以提高速度，js中并没有容易写错
    ```

    

  - IterationStatement

    ```javascript
    while(表达式) 语句
    do 语句 while(表达式)
    for(var/let; 表达式 ; 表达式) 语句
    for(var/let; in ; 表达式 ) 语句
    for(var/let; of; 表达式) 语句
    for await(of )    
    ```

    

  - WithStatement

    ```javascript
    广受诟病不建议使用
    ```

  - LabelledStatement

  - TryStatement

    ```javascript
    try{
        
    } catch {
        
    } finally {
        
    }
    
    // try 里面不是BlockStatement 它的花括号是由try语句定义的
    
    
    // try catch finally 中使用return不起作用
    
    ```

    - [[type]]: return
    - [[value]]: --
    - [[target]]: label

- 标签、循环、break、continue

  - LabelledStatement

  - IteratinStatement

  - ContinueStatement

  - BreakStatement

  - SwitchStatement

    ```javascript
    [[type]]: break continue
    [[value]]: --
    [[target]]: label
    ```

- 声明

  - FunctionDeclaration

  - GeneratorDeclaration

  - AsyncFunctionDeclaration

  - AsyncGeneratorDeclaration

  - VariableStatement

  - ClassDeclaration

  - LexicalDeclaration

    ```javascript
    function
    function *
    async function
    async function *
    var 
    class
    const
    let
    ```

  - 预处理

    ```javascript
    var a = 2;
    void function () {
        a = 1;
        return
        var a;
    }();
    console.log(a);
    
    var a = 2;
    void function () {
        a = 1;
        return ;
        const a;
    }();
    console.log(a)
    ```

  - 作用域

### 4. Structure(js执行粒度 运行时）

- 宏任务

- 微任务（Promise)

- 函数调用(Execution Context)

- 语句/声明（Completion Record)

- 表达式（Reference）

- 直接量/变量/this....

- 事件循环

  ```javascript
  get code -> execute -> wait // 依次循环
  ```

- 函数调用

  ```javascript
  |-----------------------------------------------------------|
  |Execution Context    Execution Context    Execution Context|
  |    i:0					X:1					y:2		|
  |---------------------------------------------------------->|
  |    			Execution Context Stack					 |
  |---------------------------------------------------------->|
      				Running Execution Context
                      
  Execution Context  ==> code evaluation state（用于async generator，代码执行到哪的信息）
  	i:0            ==> Funtion
      			  ==> Script or Module
                     ==> Generator
                     ==> Realm(保存所有的内置对象)
                     ==> LexicalEnvironment（执行代码中所需要的环境保存变量的）
                     ==> VariableEnvironment（用var声明变量会声明到哪）
  ```

  - Execution Context

    ```javascript
    - ECMAScript Code Execution Context    - Generator Execution Contexts
    	- code evaluation state				  - code evaluation state
    	- Funtion							 - Funtion
        - Script or Module					  - Script or Module
        - Realm								 - Realm
        - LexicalEnvironment				  - LexicalEnvironment
        - VariableEnvironment                   - VariableEnvironment
    										- Generator
    ```

  - LexicalEnvironment

    - this
    - new.target
    - super
    - 变量

  - VariableEnvironment

    - VariableEnvironment是一个历史遗留的包袱，仅仅用于处理var声明

  - Environment Record

    ```javascript
    Environment Records ==> Declarative 				 ==> Function(Environment Records)
    					(Environment Records)			==> module(Environment Records)
    				  ==> Global (Environment Records)
    				  ==> Object (Environment Records)
    ```

  - Funtion-Closure

    ```javascript
    var y = 2;
    function foo2() {
        console.log(y)
    }
    export foo2;
    
    Function: foo2
    	Environment Record:
    		y:2
    	Code:
    		console.log(y)
    
    var y = 2;
    function foo2() {
        var z = 3;
        return () => {
            console.log(y, z)
        }
    }
    var foo3 = foo2();
    export foo3;
    
    Function: foo3
    	Environment Record:			Environment Record:
    		z:2				==>			y:2
    		this:global
    	Code:
    		console.log(y, z)
    ```

  - Realm

    - 在js中，函数表达式和对象直接量均会创建对象。
    - 使用 . 做隐士转换也会创建对象。
    - 这些对象也是有原型的，如果我们没有Realm，就不知到他们的原型是什么。





  

  

  

  

  

  







​    

