// Generated by CoffeeScript 1.7.1
(function() {
  SecSocNet.CirclesController = Ember.ArrayController.extend({
    sortAscending: true,
    sortProperties: ["id"],
    circles: Ember.computed.filterBy('allCircles', 'creator', 1),
    contacts: (function() {
      return this.get('allContacts');
    }).property('allContacts'),
    allCircles: null,
    allContacts: null,
    search: '',
    circleCount: (function() {
      return this.get('circles').get('length');
    }).property('circles.@each'),
    contactCount: (function() {
      return this.get('contacts').get('length') - 1;
    }).property('contacts.@each'),
    filterContacts: function() {
      var regexp;
      if (this.get('search') === '') {
        return this.set('contacts', this.get('allContacts'));
      } else {
        regexp = new RegExp(this.get('search'));
        return this.set('contacts', this.get('allContacts').filter(function(item, index, self) {
          var circleMatched;
          circleMatched = item.get('circles').any(function(circ) {
            return circ.get('name').match(regexp);
          });
          return circleMatched || item.get('alias').match(regexp);
        }));
      }
    },
    searchContactsObserver: (function() {
      return Ember.run.debounce(this, this.filterContacts, 500);
    }).observes('search'),
    actions: {
      createCircle: function() {
        var circle, name;
        name = this.get('circleName');
        if (!name.trim()) {
          return;
        }
        circle = this.store.createRecord('circle', {
          creator: 1,
          name: name
        });
        circle.save();
        return this.set('circleName', '');
      },
      deleteCircleformContact: function(contact, circle) {
        contact.get('circles').then(function(_circles) {
          return _circles.removeObject(circle);
        });
        return contact.save();
      }
    }
  });

}).call(this);