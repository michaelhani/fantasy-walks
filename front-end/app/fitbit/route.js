import Ember from 'ember';

export default Ember.Route.extend({
	fitbit: function(){

		var self = this;
		
		Ember.$.post('http://localhost:3000/auth/fitbit', function(res){
			console.log("routed to auth/fitbit", res);
			// if(res.nil? === true){
			// 	self.transitionTo('login');
			// } else {
				self.transitionTo('dashboard');
				console.log("fitbit routing to dashboard: valid credentials affirmed")
			// }
		});
	}.on('activate')
});