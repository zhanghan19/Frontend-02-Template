# 遇到的坑

-  依赖安装

  ```js
  //generators/app/index.js
  this.npmInstall(['webpack','copy-webpack-plugin','vue-loader',"vue-template-compiler"], { 'save-dev': true });  // devDependencies
  ```

  出现如下错误

  ```shell
  The 'compilation' argument must be an instance of Compilation
  ```

  解决方案

  ```shell
  this.npmInstall(['webpack','webpack-cli','copy-webpack-plugin','vue-loader',"vue-template-compiler"], { 'save-dev': true });  // devDependencies
  ```