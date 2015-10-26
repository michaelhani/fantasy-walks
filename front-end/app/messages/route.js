import Ember from 'ember';

export default Ember.Route.extend({
	_checkLogIn: function(){
		var self = this;
		$.ajaxSetup({
			headers: { 'token': $.cookie('token') }
		});
		$.get('http://localhost/3000/sessions/hello', function(res){
			if(res.valid === false){
				self.transitionTo('login');
			}
		});
	}.on('activate')
});
