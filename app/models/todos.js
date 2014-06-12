/**
 * @git github.com/smglg/microweb
 * @date Thu Jun 6 2013
 * todos 数据模型
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var todoSchema = Schema({
  title: {
    type: String,
    unique: false,
    required: true,
    validate:[function(value){
      return !!value && value.length > 0 && value.length < 50;
    }, '不能为空并且不超过５０个长度！']
  },
  detail: {
    type: String,
    unique: false,
    required: false,
    validate:[function(value){
      if (!value)
        return true;
      return value.length < 1000;
    }, '长度不能大于1000']
  },
  processed: {
    type: Number,
    default: 0,
    validate:[function(value){
      return !isNaN(value) && value >= 0 && value <= 100;
    }, '完成进度在0-100之间']
  },
  state: {
    type: String,
    default: 'pending',
    validate: [function(value){
      return !!['pending','done','trash','doing'].filter(function(v){
        return value === v;
      }).length;
    }, 'state only "pending","done","doing","trash"']
  }
});

module.exports = mongoose.model('todos',todoSchema, 'todos');
