var Class = function(){};

Class.extend = function(protoProps, staticProps){
  var parent = this,
      child;

  // 子类的构造函数可自定，否则就借用父类的构造函数
  if (protoProps && (Object.prototype.hasOwnProperty.call(protoProps,'constructor'))) {
    child = protoProps.constructor;
  } else {
    child = function() {
        return parent.apply(this, arguments);
    };
  }

  var staticProps = staticProps || {};
  // 添加静态方法
  extend(child, parent, staticProps);

  var Surrogate = function() { this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;

  if (protoProps) extend(child.prototype, protoProps);

  child.__super__ = parent.prototype;

  return child;
};

function extend (obj) {
  each(Array.prototype.slice.call(arguments, 1), function(source) {
    for (var prop in source) {
      obj[prop] = source[prop];
    }
  });
}

function each(arr, callback) {
  for ( i in arr) {
    callback(arr[i], i);
  }
};

module.exports = Class;


