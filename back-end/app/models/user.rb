class User < ActiveRecord::Base
  has_secure_password
  has_many :api_tokens
  validates :email, uniqueness: true
end
