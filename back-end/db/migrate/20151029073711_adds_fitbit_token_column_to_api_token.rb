class AddsFitbitTokenColumnToApiToken < ActiveRecord::Migration
  def change
  	add_column :api_tokens, :fitbit_user_id, :string
  	add_column :api_tokens, :user_secret, :string
  	add_column :api_tokens, :user_token, :string
  	add_column :api_tokens, :consumer_key, :string
  	add_column :api_tokens, :consumer_secret, :string
  end
end
