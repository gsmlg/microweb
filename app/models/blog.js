/**
 * Created with JetBrains WebStorm.
 * User: Gao
 * Date: 13-8-13
 * Time: 上午10:15
 * To change this template use File | Settings | File Templates.
 */
/**
 * @git github.com/smglg/microweb
 * @date Thu Jun 6 2013
 * todos 数据模型
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var blogSchema = Schema({
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
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('blog',blogSchema, 'blog');
