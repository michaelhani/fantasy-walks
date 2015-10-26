import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		signUp: function(){
			var self = this;
			var user = {email: self.controller.get('email'), password: self.controller.get('password'), password_confirmation: self.controller.get('password_confirmation')};
			Ember.$.ajax({
				url:"http://localhost:3000/users",
				data: user,
				dataType: "json",
				type: "POST",
				success: function(response){
					if(response.token){
						Ember.$.cookie('token', response.token, { expires: 30 });
						self.controllerFor('application').set('user', response.user_id);
						self.transitionTo('messages');
					} else {
						self.controller.set('errors', response.errors);
					}
				}
			})
		}
	}
});
