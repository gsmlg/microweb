var subfix = '.jade',
    fs = require('fs'),
    path = require('path'),
    jade = require('jade');

var View = module.exports = function(){
  return View;
};

View.use = function(tpl) {
  var tpls = View.tpl;
  return tpls.filter(function(obj){
    if (obj.name === tpl) {
      return true;
    }
    return false;
  })[0].template;
};

var tpl = [];
var jadeFiles = (function(dir){
  var dirs = fs.readdirSync(dir);
  dirs.forEach(function(name){
    if( (new RegExp(subfix.replace('.','\\.')+'$')).test(name) ) {
      var pathName = (dir.replace(new RegExp('^' + dir),'')) + name.replace(new RegExp('\\'+subfix+'$'), '');
      tpl.push( {name: pathName, template: jade.compile( fs.readFileSync(path.join(dir,name),{encoding:'utf8'}), {filename:path.join(dir,name)} )});
    } else if (fs.statSync(path.join(dir,name)).isDirectory()) {
      arguments.callee(path.join(dir, name));
    }
  });
})(__dirname);

View.tpl = tpl;

module.exports = View;
