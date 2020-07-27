### 浏览器工作原理总论

1. url (HTTP)
2. HTML (parse)
3. DOM (css computing)
4. DOM with css (layout)
5. Dom with position (render)
6. Bitmap

### css computing

#### 第一步

- 遇到style标签时，我们把CSS规则保存起来
- 这里我们调用CSS Parser来分析CSS规则
- 这里我们必须要仔细研究此库分析CSS规则的格式

#### 第二步

- 当我们创建一个元素后，立即计算CSS
- 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
- 在真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算的情况，这里我们忽略

#### 第三步

- 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
- 我们从上一步骤的stack,可以获取本元素所有的父元素
- 因为我们首先获取的是“当前元素”，所以我们获得和计算父元素匹配的顺序是从内向外

#### 第四步

- 选择器也要从当前元素向外排列
- 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

#### 第五步

- 根据选择器的类型和元素属性，计算是否与当前元素匹配
- 这里仅仅实现了三种基本选择器，实际的浏览器中要处理复合选择器
- 作业（可选）：实现复合选择器，实现支持空格的Class选择器

#### 第六步

- 一旦选择匹配，就应用选择器到元素上，形成computedStyle

#### 第七步

- specificity

  ```javascript
  [   0    ,   0 ,     0  ,   0  ]
  ['inline', 'id', 'class', 'tag']
  ```

- CSS规则根据specificity和后来优先规则覆盖

- specificity是一个四元组，越在左边权重越高

- 一个CSS规则的specificity根据包含的简单选择器相加而成

#### 第八步

- 