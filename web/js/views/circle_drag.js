// Generated by CoffeeScript 1.7.1
(function() {
  SecSocNet.CircleDrag = Ember.View.extend({
    templateName: 'circles-drag',
    attributeBindings: ['draggable'],
    draggable: "true",
    dragStart: function(ev) {
      return ev.dataTransfer.setData('text/data', this.get('content.id'));
    }
  });

}).call(this);
