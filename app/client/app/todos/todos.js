jQuery(function($){
  var Task = Backbone.Model.extend({
    url: '/todos/api',
    defaults: {
      process: 0,
      status: 'undo'
    }
  }),
      TaskView = Backbone.View.extend({
        el:'div',
        attributes: {'class':'span4'},
        template: function(data){
          var s = '';
          s += '<div class="span4">';
          s += '<h2>title</h2>';
          s += '<p>javasccript</p>';
          s += '</div>';
          return s;
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
        },
        done: function(){
        },
        plus: function(){
        },
        minus: function(){
        }
      });

  var Tasks = Backbone.Collection.extend({
        model: Task
      }),
      TodoApp = Backbone.View.extend({
        initialize: function(opt){
          this.collection = opt.collection;
          this.views = [];
          this.listenTo(this.collection,'add', this.addOne);
          this.listenTo(this.collection, 'remove', this.removeOne);
        },
        id: '#todos-list',
        addOne: function(model){
          var el = (new TaskView({model:model})).render().el;
          this.$el.append(el);
        },
        addAll: function(){
          var self = this;
          this.collection.each(function(model){
            self.addOne(model);
          });
        }
      });
  var todos = new Tasks;
  var app = new TodoApp({collection: todos});


});
