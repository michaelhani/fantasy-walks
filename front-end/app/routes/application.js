import Ember from 'ember';
export default Ember.Route.extend({
  actions: {
    logout: function() {
      var self = this;
      Ember.$.ajaxSetup({
        headers: { 'token': $.cookie('token') }
      });
      Ember.$.ajax({
        url: 'http://localhost:3000/sessions',
        type: 'DELETE',
        success: function(res) {
          $.cookie('token', null);
          self.controllerFor('application').set('user', null);
          self.transitionTo('login');
        }
      });
    }
  }
});