var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  
  constructor(args, opts) {
    super(args, opts);
  }

  initPackage() {
   
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.npmInstall();
  }

  async method1() {
    this.fs.copyTpl(
      this.templatePath('t.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    );
   }

};

// D:\www\geekbang\work\Frontend-02-Template\week16\generators\app\templates\t.html
// D:\www\geekbang\work\Frontend-02-Template\week16\templates