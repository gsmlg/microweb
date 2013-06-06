/**
 * todo 客户端
 * @author gaoshiming@live.com
 * @github github.com/smglg/microweb
 * @date Thu Jun 6 2013
 */
jQuery(function($){
  var Task = Backbone.Model.extend({
    idAttribute: '_id',
    url: '/todos/api',
    defaults: {
      processed: 0
    },
    parse: function(data){
      'status' in data || (data.status = null);
      if (data.status === 0){
        this.trigger('error');
        return null;
      } else if (data.status === 1) {
        this.trigger('done');
        return data.todo;
      }
      return data;
    }
  }),
      TaskView = Backbone.View.extend({
        tagName:'div',
        attributes: {'class':'span4 thumbnail'},
        template: function anonymous(locals) {
          var buf = [];
          var locals_ = (locals || {}),title = locals_.title,detail = locals_.detail,processed = locals_.processed;buf.push("<h2>" + (title ? title : "") + "</h2><p>" + (detail ? detail : "") + "<div class=\"progress\"><div style=\"width:"+(processed ? processed : "")+"%\" class=\"bar\" ></div></div></p><p><a class=\"btn edit\"><i class=\"icon-wrench\"></i></a><a class=\"btn do\"><i class=\"icon-ok\"></i></a><a class=\"btn drop\"><i class=\"icon-remove\"></i></a></p>");;return buf.join("");
        },
        render: function(){
          this.$el.html(this.template(this.model.attributes));
          return this;
        },
        initialize: function(opt){
          this.model = opt.model;
          this.listenTo(this.model,'change',this.render);
          this.listenTo(this.model, 'remove', this.remove);
        },
        events: {
          'click .plus': 'plus',
          'click .minus': 'minus',
          'click .done': 'done',
          'click .drop': 'drop'
        },
        drop: function(){
          this.model.destroy();
        },
        done: function(){
        },
        plus: function(){
        },
        minus: function(){
        }
      }),
      DashboardView = Backbone.View.extend({
        el: $('#dashboard')[0],
        events:{
          'click #tasks': 'tasks',
          'click #done': 'done',
          'click #add': 'add',
          'click #trash': 'trash'
        },
        initialize: function(attr){
          this.taskView = attr.taskView;
        },
        add: function(){
          this.taskView.model.clear();
          this.taskView.$el.modal();
        }
      }),
      TaskSettingView = Backbone.View.extend({
        el: $('#taskModal')[0],
        initialize: function(attr){
          this.model = new Task;
          this.collection = attr.collection;
          this.listenTo(this.model, 'change', this.render);
          this.listenTo(this.model, 'done', this.done);
        },
        done: function(){
          this.collection.fetch();
          this.$el.modal('hide');
        },
        setModel: function(model){
          this.model.set(model);
        },
        serialize: function(){
          var attrs = {};
          var arr = this.$el.find('form').serializeArray();
          _.each(arr, function(obj){
            attrs[obj.name] = obj.value;
          });
          return attrs;
        },
        events: {
          'click .btn-primary': 'doSync'
        },
        doSync: function(){
          this.model.save(this.serialize(), {wait:true});
        }
      }),
      Tasks = Backbone.Collection.extend({
        model: Task,
        url: '/todos/api',
        parse: function(data){
          if(data.status===1){
            return data.todo;
          } else {
            this.error(data.message.type);
            return null;
          }
        },
        error: function(data){
          console.log(data);
        }
      }),
      TodoApp = Backbone.View.extend({
        initialize: function(opt){
          this.collection = opt.collection;
          this.views = [];
          this.listenTo(this.collection,'add', this.addOne);
          this.listenTo(this.collection, 'remove', this.removeOne);
          this.render();
        },
        tagName: 'div',
        attributes: {'class':'row-fluid'},
        addOne: function(model){
          var el = (new TaskView({model:model})).render().el;
          this.$el.append(el);
        },
        addAll: function(){
          var self = this;
          this.collection.each(function(model){
            self.addOne(model);
          });
        },
        render: function(){
          this.$el.empty();
          this.addAll();
        }
      });
  window.todos = new Tasks;
  window.app = new TodoApp({collection: todos});
  $('.span9').append(app.el);
  todos.fetch();
  window.taskSetting = new TaskSettingView({collection: todos});
  window.dashboard = new DashboardView({taskView: taskSetting, app: app});
});


