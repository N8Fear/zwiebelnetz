// Generated by CoffeeScript 1.7.1
(function() {
  SecSocNet.Onion = DS.Model.extend({
    onion: DS.attr('string'),
    contact: DS.belongsTo('contact', {
      async: true
    }),
    profiles: DS.hasMany('profile', {
      async: true
    })
  });

}).call(this);
