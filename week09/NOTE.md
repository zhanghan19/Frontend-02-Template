#### 3子琪

1. 绘制棋谱

   - ```javascript
     // 状态
     0 空 1 √ 2 ×
     // 定义先后顺序 
     let color = 1;
     ```

2. 添加事件及事件处理函数

3. 判断输赢

   - ```javascript
     		function check(pattern, color) {
     			// 判断行
     			for (let i = 0; i < 3; i++) {
     				let win = true;
     				for (let j = 0; j < 3; j++) {
     					if (pattern[i][j] !== color) {
     						win = false;
     					}
     				}
     				if (win)
     					return win
     			}
     
     			// 判断列
     			for (let i = 0; i < 3; i++) {
     				let win = true;
     				for (let j = 0; j < 3; j++) {
     					if (pattern[j][i] !== color) {
     						win = false;
     					}
     				}
     				if (win)
     					return win
     			}
     
     			// 判断斜方向
     			// '\'方
     			{
     				let win = true;
     				for (let j = 0; j < 3; j++) {
     					if (pattern[j][j] !== color) {
     						win = false;
     					}
     				}
     				if (win)
     					return win
     			}
     			// '/'方
     			{
     				let win = true;
     				for (let j = 0; j < 3; j++) {
     					if (pattern[j][2 - j] !== color) {
     						win = false;
     					}
     				}
     				if (win)
     					return win
     			}
     
     		}
     ```

   - 

4. 添加AI、

   - 判断将赢

     ```javascript
     function clone(pattern) {
         return JSON.parse(JSON.stringify(pattern));
     }
     
     function willWin(pattern, color) {
         for (let i = 0; i < 3; i++) {
             for (let j = 0; j < 3; j++) {
                 if (pattern[i][j])
                     continue;
                 let tmp = clone(pattern);
                 tmp[i][j] = color;
                 if (check(tmp, color)) {
                     return [i, j];
                 }
                 // pattern[i][j] = 0;
             }
         }
         return null;
     }
     ```

     

   - 给出最佳策略

     ```javascript
     function bestChoice(pattern, color) {
         let p;
         if (p = willWin(pattern, color)) {
             return {
                 point: p,
                 result: 1
             }
         }
         let result = -1;
         let point = null;
         for (let i = 0; i < 3; i++) {
             for (let j = 0; j < 3; j++) {
                 if (pattern[i][j])
                     continue;
                 let tmp = clone(pattern);
                 tmp[i][j] = color;
                 let r = bestChoice(tmp, 3 - color).result; // 难点
                 if (-r > result) {
                     result = -r;
                     point = [j, i];
                 }
             }
         }
     
         return {
             point: point,
             result: point ? result : 0
         }
     }
     ```

     

     

