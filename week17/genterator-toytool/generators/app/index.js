var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  async initPackage() {
    // 获取项目名称
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      }
    ]);

    // 整理包文件
    const pkgJson = {
      "name": answers.name,
      "version": "1.0.0",
      "description": "",
      "main": "generators/app/index.js",
      "scripts": {
        "build": "webpack",
        "test": "mocha --require @babel/register",
        "coverage": "nyc mocha --require @babel/register"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {

      },
      "dependencies": {

      }
    };

    // 扩展或创建包。目标路径中的json文件
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

    // 安装依赖
    this.npmInstall(['vue'], { 'dev': true });  // dependencies

    this.npmInstall([
      "nyc",
      "mocha",
      "babel-plugin-istanbul",
      "babel-loader",
      "@istanbuljs/nyc-config-babel",
      "@babel/register",
      "@babel/preset-env",
      "@babel/core",
      "webpack",
      "webpack-cli",
      "copy-webpack-plugin",
      "vue-loader",
      "vue-template-compiler"], { 'save-dev': true });  // devDependencies
    this.fs.copyTpl(
      this.templatePath('sample-test.js'),
      this.destinationPath('test/sample-test.js'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath('HelloWorld.vue'),
      this.destinationPath('src/HelloWorld.vue'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answers.name }
    );
  }


};