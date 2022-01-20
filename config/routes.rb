Rails.application.routes.draw do
  root 'pokemons#index'
  get 'admin',:to => "pokemons#index"
  get 'access/menu'
  get 'access/login'
  post "access/attempt_login"
  get 'access/logout'
  resources :users
  resources :types
  resources :stats
  resources :abilities
  resources :pokemons
  namespace :api do
    resources :pokemons
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
