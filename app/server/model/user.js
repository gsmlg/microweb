mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/microweb');
UserSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		validate:[function(value){
			return /^[^0-9]/.test(value) && /^[\u4e00-\u9fa5]{2,10}$|^\w{6,20}$/.test(value);
		}, '用户名不能以数字开头，可以是2-10个汉字或6-20个字母、数字或下划线!']
	},
	email: {
		type: String,
		unique: true,
		required: true,
		set: function(val) {
			return val.toLowerCase();
		},
		validate: [function(value){
			return /^[\u4e00-\u9fa5\w\.-]+@[A-Za-z0-9-\.]+\.[A-Za-z]{2,5}$/.test(value);
		},'email不正确！']
	},
	password: {
		type: String,
		required: true,
		validate: [function(value){
			return /^\S{8,30}$/.test(value);
		},'密码长度不合要求！']
	},
	registTime: {
		type: Date
	}
});

var UserModel = module.exports = mongoose.model('user', UserSchema, 'users');
