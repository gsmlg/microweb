jQuery(function($){
  var Task = Backbone.Model.extend({
    url: '/todos/api',
    defaults: {
      process: 0,
      status: 'undo'
    }
  }),
      TaskView = Backbone.View.extend({
        tagName:'div',
        attributes: {'class':'span4'},
        template: function(data){
          var s = '';
          s += '<h2>' + (typeof data.title === 'string' ? data.title : 'title') + '</h2>';
          s += '<p>javasccript</p>';
          return s;
        },
        render: function(){
          this.$el.append(this.template(this.model.attributes));
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
        },
        done: function(){
        },
        plus: function(){
        },
        minus: function(){
        }
      }),
      Tasks = Backbone.Collection.extend({
        model: Task,
        url: '/todos/api'
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
        attributes: {'class':'row-fluit'},
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

});
