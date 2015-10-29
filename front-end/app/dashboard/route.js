import Ember from 'ember';
export default Ember.Route.extend({
	_checkLogIn: function(){
		console.log("in messages checklogin function")
		var self = this;
		Ember.$.ajaxSetup({
			headers: { 'token': $.cookie('token') }
		});
		Ember.$.get('http://localhost:3000/sessions/hello', function(res){
			console.log("successful request")
			if(res.valid === false){
				self.transitionTo('login');
			} else {
				console.log("dashboard routing: valid credentials affirmed")
			}
		});
	}.on('activate')
});
