import Ember from 'ember';
export default Ember.Route.extend({
  _checkLogIn: function() {
    var self = this;
    $.ajaxSetup({
      headers: { 'token': $.cookie('token') }
    });
    $.get('http://localhost:3000/sessions/hello', function(res) {
      console.log(res);
      if(res.valid == true) {
        console.log('valid');
        self.transitionTo('messages');
      } else {
        console.log('invalid');
        $.cookie('token', null);
      }
    });
  }.on('activate'),
  actions: {
    logIn: function() {
      var self = this;
      $.post(
        'http://localhost:3000/sessions',
        {
          'email':self.controller.get('email'),
          'password':self.controller.get('password'),
        },
        function(res) {
          console.log('Res', res);
          if(res.token) {
            $.cookie('token', res.token , { expires: 30 });
            self.controllerFor('application').set('user', res.user_id);
            self.transitionTo('messages');
          } else {
            self.controller.set('errors', res.errors);
          }
        }
      );
    }
  },
});