#!/usr/bin/env node

'use strict';

const path = require('path');

const SuperInit = require('super-init');

const init = new SuperInit();

function join(...args) {
  return path.join(__dirname, ...args);
}

init.snippet('package.json', `{
  "name": "{{请输入应用名： }}",
  "scripts": {
    "dev": "egg-bin dev"
  }
}`);

init.snippet('app/controller/home.js', `
'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      const locals = {username: 'Jackson Tian'};
      this.ctx.body = yield this.ctx.renderView('index.html', locals);
    }
  }

  return HomeController;
};`);

init.snippet('app/router.js', `
module.exports = app => {
  app.get('/', 'home.index');
};`);

init.snippet('config/config.default.js', `
// 切记：要改为自己的 key 值
exports.keys = '{{此处改为你自己的 Cookie 安全字符串: }}';`);

init.snippet('config/plugin.js', `
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs'
};`);

init.snippet('config/config.default.js', `
exports.view = {
  defaultViewEngine: 'ejs',
  mapping: {
    '.html': 'ejs',
  }
};`, 'append');

init.snippet('config/config.default.js', `
exports.ejs = {
  layout: 'layout.html'
};`, 'append');

init.snippet('.gitignore', `
node_modules
run
logs
`);

const viewDir = join('../app/view');
init.dir('app/view', viewDir);

const bootstrapDir = join('../public/bootstrap-3.3.7');
init.dir('app/public/bootstrap-3.3.7', bootstrapDir);
const jQueryFile = join('../public/jquery-3.2.0.min.js');
init.file('app/public/jquery-3.2.0.min.js', jQueryFile);

init.exec('cnpm i egg@1 --save');
init.exec('cnpm i egg-bin --save-dev');
init.exec('cnpm i egg-view-ejs@1.1.0 --save');

init.run().then(() => {
  console.log('Done');
}, (err) => {
  console.error(err.stack);
});
