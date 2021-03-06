Rails.application.routes.draw do

  root "users#index"
  get '/users/search', to: 'users#search'

  get '/users', to: 'users#index'
  get '/users/search', to: 'users#search'

  get '/users/:user_id/reviews', to: "users#reviews"

  resources :users, only: [:show] do
    resources :books, only: [:create, :show]
  end
  get '/books/:book_id', to: 'books#show'
  get '/users/:user_id/recommended', to: 'solo_readings#recommended_books'
  get '/users/:user_id/current', to: 'solo_readings#current_books'
  get '/users/:user_id/favorite', to: 'solo_readings#favorite_books'
  get '/users/:user_id/queue', to: 'solo_readings#queue_books'
  get '/users/:user_id/history', to: 'solo_readings#history_books'
  get '/trending', to: 'solo_readings#trending_books'

  post '/users/:user_id/add_to_current', to: 'books#add_to_current'
  post '/users/:user_id/add_to_favorites', to: 'books#add_to_favorites'
  post '/users/:user_id/add_to_queue', to: 'books#add_to_queue'
  post '/users/:user_id/books/:book_id/mark_complete', to: 'books#mark_complete'

  resources :books, only: [] do
    resources :chapters , only: [:show, :index]
    resources :reviews , only: [:index, :create, :show]
  end

  resources :chapters, only: [] do
    resources :reactions , only: [:create, :show, :index]
  end

  resources :reactions, only: [] do
    resources :comments , only: [:create, :index]
  end

  post '/register', to: 'users#create'
  post '/login', to: 'sessions#login'
  get '/logout', to: 'sessions#logout'

  get '/check_books/:book_id', to: 'books#check_books'
end
