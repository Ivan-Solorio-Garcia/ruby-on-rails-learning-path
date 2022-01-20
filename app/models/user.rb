class User < ApplicationRecord
  has_secure_password
  has_many :pokemons, :class_name => 'Pokemon'
end
