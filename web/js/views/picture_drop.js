// Generated by CoffeeScript 1.7.1
(function() {
  SecSocNet.PictureDrop = Ember.View.extend({
    templateName: 'picture-drop',
    attributeBindings: ['currentImage'],
    imgWidth: 100,
    imgHeight: 100,
    imgSource: "",
    isUploading: false,
    hasProfilePicture: false,
    imgSource: (function() {
      if (this.get('currentImage').indexOf("img", 0) === 0) {
        this.set('hasProfilePicture', false);
      } else {
        this.set('hasProfilePicture', true);
      }
      return this.get('currentImage');
    }).property('currentImage'),
    actions: {
      deleteProfilePicture: function() {
        return Ember.$.ajax({
          type: "DELETE",
          url: "/api/profile_picture",
          success: (function(_this) {
            return function(data, status, nil) {
              _this.set('imgSource', 'img/no_profile_picture.jpg');
              return _this.set('hasProfilePicture', false);
            };
          })(this),
          error: (function(_this) {
            return function(xhr, ajaxOptions, error) {
              _this.set('imgSource', 'img/no_profile_picture.jpg');
              return _this.set('hasProfilePicture', false);
            };
          })(this)
        });
      }
    },
    didInsertElement: function() {
      $('#f').change((function(_this) {
        return function(ev) {
          var file;
          file = ev.target.files[0];
          return _this.uploadPicture(file);
        };
      })(this));
      return this.$('.picture-zone').on("click", (function(_this) {
        return function(event) {
          return $('#f').click();
        };
      })(this));
    },
    dragOver: function(ev) {
      return ev.preventDefault();
    },
    drop: function(ev) {
      var file;
      ev.preventDefault();
      file = ev.dataTransfer.files[0];
      return this.uploadPicture(file);
    },
    uploadPicture: function(file) {
      var formData, reader, that, token, user, xhr;
      that = this;
      if (typeof FileReader !== "undefined" && /image/i.test(file.type)) {
        reader = new FileReader();
        reader.onload = function(event) {
          return Ember.run(function() {
            return that.set('imgSource', event.target.result);
          });
        };
        reader.readAsDataURL(file);
      }
      user = Ember.$.cookie('auth_user');
      token = Ember.$.cookie('auth_token');
      that.$('#uploadProgress').show();
      xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", function(evt) {
        if (evt.lengthComputable) {
          return Ember.run(function() {
            return $('#uploadBar')[0].style.width = (evt.loaded / evt.total) * 100 + "%";
          });
        }
      }, false);
      xhr.addEventListener("load", function() {
        return Ember.run(function() {
          that.$('#uploadProgress').hide();
          return that.set('hasProfilePicture', true);
        });
      }, false);
      xhr.open("post", "/profile_picture", true);
      xhr.setRequestHeader('Auth-User', user);
      xhr.setRequestHeader('Auth-Token', token);
      formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);
      return xhr.send(formData);
    }
  });

}).call(this);
