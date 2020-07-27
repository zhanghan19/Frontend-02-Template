### 浏览器工作原理总论

1. url (HTTP)
2. HTML (parse)
3. DOM (css computing)
4. DOM with css (layout)
5. Dom with position (render)
6. Bitmap

### 有限状态机

- 每一个状态机都是一个机器

  - 在每一个机器里，我们可以做计算、存储、输出。。。
  - 所有的这些机器接受的输入是一致的
  - 状态机的每一份机器本身没有状态，如果我们用函数来表示的话，他应该是纯函数（无副作用）

- 每一个机器知道下一个状态

  - 每一个机器都有确定的下个一状态（Moore）
  - 每一个机器根据输入决定下一个状态（Mealy）

- js中的有限状态机

  ```javascript
  // 每一个函数是一个状态
  function state (input) {
      // 在函数中，可以自由地编写代码，处理每个状态逻辑
      return next; // 返回值作为下一个状态
  }
  ```


### TCP与IP的一些基础知识

| 流               | 包         |
| ---------------- | ---------- |
| 端口             | IP地址     |
| require（"net"） | libnet/lib |
|                  |            |

### HTTP请求总结

- 设计一个HTTP请求的类
- content type 是一个必要的字段，要有默认值
- body是kv格式
- 不同的content-type 影响body的格式

### 第二步 send函数总结

- 在Request的构造器中手机必要的信息
- 设计一个send函数，把请求真实发送到服务器
- send函数应该是异步的，所以返回Promise

### 第三步发送请求

- 设计支持已有的connection或者自己新建connection
- 收到数据传给parser
- 根据parser的状态resolve Promise

### 第四步ResponseParser总结

- Response必须分段构造，所以我们要用一个ResponseParse来“装配”
- ResponseParser分段处理ResponseText,我们用状态机来分析文本的结构

### 第五步BodyParser总结

- Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题
- 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式

## HTML解析

### 第一步总结

- 为了方便文件管理，我们把parser单独拆到文件中
- parser接受HTML文本作为参数，返回一颗DOM树

### 第二部总结

- 我们用FSM来实现HTML的分析
- 在HTML标准中，已经规定了HTML的状态
- Toy-Browser只挑选其中一部分状态，完成一个最简版本

### 第三步总结

- 主要的标签有：开始标签，结束标签和自封闭标签
- 在这一步我们暂时忽略属性

### 第四步总结

- 在状态机中，除了状态迁移，我们还会要加入业务逻辑
- 我们在标签结束状态提交标签token

### 第五步总结

- 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
- 处理属性的方式跟标签类似
- 属性结束时，我们把属性加到标签Token上

### 第六步总结

- 从标签构建DOM树的基本技巧是使用栈
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
- 自封闭节点可视为入栈后立刻出栈
- 任何元素的父元素是它入栈前的栈顶

### 第七部总结

- 文本节点与自封闭标签处理类似
- 多个问本节点需要合并

### 问题
- response 解析过程 如何确定有多少种状态的，确定状态的过程有没有什么套路
```
  WAITING_STATUS_LINE = 0;
  WAITING_STATUS_LINE_END = 1;
  WAITING_HEADER_NAME = 2;
  WAITING_HEADER_SPACE = 3;
  WAITING_HEADER_VALUE = 4;
  WAITING_HEADER_LINE_END = 5;
  WAITING_HEADER_BLOCK_END = 6;
  WAITING_BODY = 7;
```



