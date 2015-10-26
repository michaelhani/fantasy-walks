export default Ember.Route.extend({
  actions: {
    logout: function() {
      var self = this;
      $.ajaxSetup({
        headers: { 'token': $.cookie('token') }
      });
      $.ajax({
        url: 'http://localhost:3000/sessions',
        type: 'DELETE',
        success: function(res) {
          $.cookie('token', null);
          self.controllerFor('application').set('user', null);
          self.transitionTo('login');
        }
      })
    }
  }
});