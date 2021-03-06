// Generated by CoffeeScript 1.7.1
(function() {
  SecSocNet.Router.map(function() {
    this.route('posts', {
      path: "/newsfeed"
    });
    this.route('profiles', {
      path: "/profiles"
    });
    this.resource('contacts', {
      path: "/contacts"
    }, (function() {
      this.route('edit', {
        path: ":id"
      });
    }));
    this.route('settings', {
      path: "/settings"
    });
    return this.route('circles', {
      path: "/circles"
    });
  });

}).call(this);
