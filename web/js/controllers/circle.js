// Generated by CoffeeScript 1.7.1
(function() {
  SecSocNet.CircleController = Ember.ObjectController.extend({
    actions: {
      deleteCircle: function() {
        var post;
        post = this.get('model');
        post.deleteRecord();
        return post.save();
      }
    }
  });

}).call(this);
