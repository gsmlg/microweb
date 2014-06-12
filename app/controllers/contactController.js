/**
 * Created with JetBrains WebStorm.
 * User: Gao
 * Date: 13-8-18
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 */
var Controller = require('../../lib/Controller');

// 加载视图
var view = require('../view');

// 设置控制器
var contactController = Controller.extend({
    uri: /^\/contact(\/.*)?$/,
    start: function(){
        if (/^\/todos\/api/.test(this.req.url)){
            // 数据页面
            this.emit('auth');
        } else {
            // 加载页面
            this.user = this.req.session.user;
            this.user = this.user || {};
            this.user.name = this.user.name || ( Math.random() * 1000000 | 0 );
            this.req.session.user = this.user;
            if (/^\/contact\/?$/.test(this.req.url))
                this.emit('render',
                    view.use('contact'),
                    {title: 'Contact', username: this.user.name, activeBar: 'contact'}
                );
        }
    },
    auth: function(){
        if (!this.req.session.user || !this.req.session.user.name){
            this.emit('redirect','/404');
        }
        switch(this.req.method.toLowerCase()){
            case 'get':
                this.emit('get');
                break;
            case 'post':
                this.emit('post');
                break;
            case 'put':
                this.emit('put');
                break;
            case 'delete':
                this.emit('delete');
                break;
            default:
                this.emit('redirect','/404');
        }
    },
    get: function(){
        if (/^\/todos\/api\/onlineusers/.test(this.req.url))
            this.res.send('123');
        this.res.end();
    },
    post: function(){

    },
    put: function(){

    },
    delete: function(){

    }
});

module.exports = contactController;
