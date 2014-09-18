// Generated by CoffeeScript 1.7.1
(function() {
  SecSocNet.CircleDrop = Ember.View.extend({
    templateName: 'circles-drop',
    dragOver: function(ev) {
      return ev.preventDefault();
    },
    drop: function(ev) {
      var circle, contact, controller, id;
      id = ev.dataTransfer.getData('text/data');
      controller = this.get('controller');
      circle = controller.get('circles').filterBy('id', id)[0];
      contact = controller.get('contacts').filterBy('id', this.get('content.id'))[0];
      return contact.get('circles').then(function(_circles) {
        _circles.pushObject(circle);
        return contact.save().then((function() {}), function() {
          return contact.reload();
        });
      });
    }
  });

}).call(this);
