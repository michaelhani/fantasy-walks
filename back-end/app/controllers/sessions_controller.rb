class SessionsController < ApplicationController
	skip_before_filter :verify_authenticity_token
	def hello
		token = request.headers["token"]
		valid_token = ApiToken.find_by(token: token)
		if valid_token
			session[:user_id] = valid_token.user_id
			
			render json: {valid: true}

		else 
			render json: {valid: false}
		end
	end
	def destroy
		token = request.headers["token"]
		valid_token = ApiToken.find_by(token: token)
		if valid_token
			valid_token.destroy
			render json: {success: true}
		else
			render json: {success: false}
		end
	end
	def create
		user = User.find_by(email: params[:email])
		if user && user.authenticate(params[:password])
			token = SecureRandom.hex
			user.api_tokens.create(token: token)
			render json: {token: token, user_id: user.id}
		else
			render json: {errors: "Invalid email/password combination"}
		end
	end
end
