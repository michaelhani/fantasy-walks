class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def create
  	user = User.new
  	user.email = params[:email]
  	user.password = params[:password]
  	user.password_confirmation = params[:password_confirmation]
  	if user.save
  		token = SecureRandom.hex
  		user.api_tokens.create(token: token)
  		render json: {token: token, user_id: user.id}
  	else
  		render json: {errors: user.errors.full_messages}
  	end
  end
end
