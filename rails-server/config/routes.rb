Rails.application.routes.draw do

  resources :users, only: [:show] do
    resources :books, only: [:create, :show]
  end

  get '/users/:id/recommended', to: 'soloreadings#recommended'
  get '/users/:id/current', to: 'soloreadings#current'
  get '/users/:id/favorite', to: 'soloreadings#favorite'
  get '/users/:id/queue', to: 'soloreadings#queue'
  get '/users/:id/history', to: 'soloreadings#history'

  resources :books, only: [] do
    resources :chapters , only: [:create, :show]
    resources :reviews , only: [:index, :create, :show]
  end

  resources :chapters, only: [] do
    resources :reactions , only: [:index, :create, :show]
  end

  resources :reactions, only: [] do
    resources :comments , only: [:create]
  end

  get '/register', to: 'users#create'
  get '/login', to: 'sessions#login'
  get '/logout', to: 'sessions#logout'
end
