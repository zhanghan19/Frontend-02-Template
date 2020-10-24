var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  
  constructor(args, opts) {
    super(args, opts);
  }

  async initPackage() {
   
    let answer = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      }
    ])

    const pkgJson = {
      "name": answer.name,
      "version": "1.0.0",
      "description": "",
      "main": "generators/app/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        
      },
      dependencies: {
       
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.npmInstall(['vue'], { 'save-dev': false });
    this.npmInstall(['webpack', "vue-loader","vue-style-loader",
            "css-loader","vue-template-compiler"], { 'save-dev': true });
  }

  async method1() {
    this.fs.copyTpl(
      this.templatePath('t.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    );
   }

   readFiles() {
    this.fs.copyTpl(
      this.templatePath('HelloVue.vue'),
      this.destinationPath('src/HelloVue.vue'),
      { }
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      { }
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
      { }
    );
   }

};

// D:\www\geekbang\work\Frontend-02-Template\week16\generators\app\templates\t.html
// D:\www\geekbang\work\Frontend-02-Template\week16\templates