学习笔记

# week02

- 语言按语法分类

  - 非形式语言
    - 语法没有严格的定义例如：中文、英文
  - 形式语言（乔姆斯基谱系）
    - 0型 无限制文法
    - 1型 上下文相关文法
    - 2型 上下文无关文法
    - 3型 正则文法

- 产生式

  - 用尖括号括起来的名称来表示语法 结构名
  - 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    - 基础结构称终结符
    - 复合结构称非终结符
  - 引号和中间的字符表示终结符
  - 可以有括号
  - *表示重复多次
  - |表示或
  - +表示至少一次
  - 问题
    - 产生式还是很模糊
    - 产生式表示四则运算

- 深入理解产生式

  - 0型 无限制文法

    - ?::?

  - 1型 上下文相关文法

    - ?<A>?::=?<B>?

  - 2型 上下文无关文法

    - <A>::=?

  - 3型 正则文法

    - <A>::=<A>?
    - <A>::=?<A>

  - 其他产生式

    - EBNF ABNF Customized

    - javascript产生式语法

      ```javascript
      AdditiveExpression:
      	MultiplicativeExpression
          AdditiveExpression +
      MultiplicativeExpression
      	AdditiveExpression -
      	MultiplicativeExpression
      
      
      
      // 带括号的四则运算产生式
      <Expression> ::= 
          <AdditiveExpression><EOF>
          
      <AdditiveExpression> ::= 
          <MultiplicativeExpression>
          |<AdditiveExpression><+><MultiplicativeExpression>
          |<AdditiveExpression><-><MultiplicativeExpression>
          
      <MultiplicativeExpression> ::= 
          <Number>
          |<MultiplicativeExpression><*><Number>
          |<MultiplicativeExpression></><Number>
      	|(<AdditiveExpression>)
      
      <Number> = 有理数
      ```

- 现代语言的分类

  - C++中，*可能表示乘号或者指针，具体是哪个，取决于星号前面的标识符是否被声明为类型
  - VB中，< 可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
  - Python中，行首的tab符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent
  - javascript中/可能是除号，也可能是正则表达开头，处理方式类似于VB，字符串模板中也需要特殊处理}，还有自动插入分号规则
  - 现代语言分类
    - 形式语言--用途
      - 数据描述语言
        - JSON HTML XAML SQL CSS
      - 编程语言
        - C C++ java c#, python, Ruby, Perl, Lisp, T-SQL, Clojure, Haskell, javascript
    - 形式语言 --表达方式
      - 声明式语言：告诉你结果是怎样的
        - JSON , HTML , XAML , SQL , CSS , Lisp， Clojure，Haskell
      - 命令型语言：达成结果的过程是怎样的
        - C C++ java c#, python, Ruby, Perl,  javascript
    - 练习：
      - 给你所知道的语言类型分类 

- 编程语言的性质

  - 图灵完备性

    ```
    不直观的抽象描述：和图灵机完全等效的就是图灵完备 
    直观的描述：就是所有的可计算的问题都可用来描述的这样的语言就是具备图灵完备性的
    ```

    

    - 命令式----图灵机
      - goto
      - if和while
    - 声明式----lambda
      - 递归

  - 动态与静态

    - 动态

      ```javascript
      实在用户的设备上运行或者在线的服务器上运行的
      ```

      - 在用户的设备/在线的服务器上
      - 产品实际运行时
      - Runtime

    - 静态

      - 在程序员的设备上
      - 产品开发时
      - Compiletime

  - 类型系统

    - 动态类型系统与静态类型系统
    - 强类型系统与弱类型
      - String + Number
      - String == Boolean
    - 复合类型
      - 结构体
      - 函数签名
    - 子类型
    - 泛型
      - 逆变/协变

- 一般命令式编程语言的设计方式

  - Atom(关键字，直接量，变量名)
    - Identifier
    - Literal
  - Expression：原子级的这些结构通过运算符相连接加上一些辅助的符号
    - Atom
    - Operator
    - Punctuator
  - Statement：表达式加上特定的标识符和一些特定的关键字和符号形成一定的结构我们称之为语句
    - Expresion
    - Keyword
    - Punctuator
  - Structure：结构化帮助我们组织代码，把代码分成不同的块，达到分成不同的复用结构
    - Function
    - Class
    - Process
    - Namespace
  - Program：组织代码
    - Program
    - Module 
    - Package
    - Library

- JS类型 | number

  - Atom

    | Grammar         | Runtime           |
    | --------------- | ----------------- |
    | Literal         | Types             |
    | Variable        | Execution Context |
    | keywords        |                   |
    | Whitespace      |                   |
    | Line Terminator |                   |

  - Types

    - **Number**

      - IEEE 754 Double Float
        - Sign(1)
        - Exponent（11位指数位，含1位符号位  log<sub>10</sub>(2<sup>1024</sup>)  ≈  308）
        - Fraction（52位指数位，默认1.xxxx  log<sub>10</sub>(2<sup>53</sup>)  ≈  15.94）
      - Grammar
        - DecimallLiteral
          - 0
          - 0.
          - .2
          - 1e3
        - BinaryIntegerlitral
          - ob111
        - OctalIntegerLiteral
          - 0o10
        - HexIntegerLiteral
          - 0xFF\
      - 注意的坑
        - 0.toString();
        - 0 .toString();

    - **String**

      - Character

      - Code Point

        - ASCII
        - Unicode
        - UCS
        - GB
          - GB2312
          - GBK(GB13000)
          - GB18030
        - ISO-8859
        - BIG5

      - Encoding

      - Homework

        ```javascript
        // 把一个String它代表的字节给转换出来，用utf8对string进行编码
        /**
        * @param {string} str
        * @return {Array}
        */
        var UTF8_Encoding = function(str) {
            function charToUtf8(char) {
      	        var code = encodeURI(char);
                var codeList = code.split('%');
                codeList = codeList.filter(item => {
                    if(item){
                        return parseInt(item,16)
                    }
                });
                return codeList.join('|')
            }
            return Array.from(str).map((char) => charToUtf8(char));
        }
        
        console.log(UTF8_Encoding('张寒'));
        
        ```
        
      - Grammar
      
        - "abc"
        - 'abc'
- `abc`
  
  - **Boolean**
    
    - **Object**
    
    - **Null**
    
      ```
      定义了但没有赋值
      是一个关键字
      ```
    
      
    
    - Undefined
    
      ```
      未定义
      是全局变量
      ```
    
      
    
    - Symbol
  
- JS对象 | 对象的基础知识

  - 鱼
    - 标识符（identifier）
    - 状态（state）
    - 行为（behavior）
  - 在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则。

- JS对象 | JS中的对象

  - 在JavaScript运行时，原生对象的描述方式非常简单，我们只需要关心原型和属性两个部分。

  - javascript 用属性来统一抽象对象状态和行为。

  - 一般来说数据属性描述状态，访问器属性则用于迷哦奥数行为。

  - 数据属性中如果存储函数，也可以用于描述行为。

    | Data Property | Accessor Property |
    | ------------- | ----------------- |
    | [[value]]     | get               |
    | writable      | set               |
    | enumerable    | enumerable        |
    | configurable  | configurable      |

    ```javascript
    当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是否有此名称的属性，而原型对象还可能有原型，因此，会有“原型链这一说法“。
    这一算法保证了，每个对象只需要描述自己和原型的区别即可
    ```

    

  - API/Grammar

    - {} . [] Object.defineProperty
    - Object.create / Object.setPrototypeOf / Object.getPrototypeOf
    - new /class / extends
    - new / function /prototype
  
  - Funciton Object
  
    ```javascript
    前面讲述了JavaScript中的一般对象
    但是JavaScript中还有一些特殊的对象，比如函数对象。
    除了一般对象的属性和原型，函数对象还有一个行为[[call]]。
    我们用JavaScript中的function关键字、箭头运算符或者Function构造器创建的对象，会有[[call]]这个行为。
    我们用类似f()这样的语法把对象当做函数调用时，会访问到[[call]]这个行为。
    如果对应的对象没有[[call]]行为，则会报错。
    ```
  
  - Special Object
  
    - Array[[length]]
    
    - Object.prototype[[setPrototypeOf]]
    
      ```
      Array[[length]]
      Object.prototype[[setPrototypeOf]]
      argument
      ```
    
      
    
  - Host Object
