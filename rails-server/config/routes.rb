Rails.application.routes.draw do

  resources :users, only: [:show] do
    resources :books, only: [:create, :show]
  end

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
