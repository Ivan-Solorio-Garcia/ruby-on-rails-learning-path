Rails.application.routes.draw do
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
