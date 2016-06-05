Rails.application.routes.draw do

  root "users#index"

  resources :users, only: [:show] do
    resources :books, only: [:create, :show]
  end

  get '/users/:user_id/recommended', to: 'soloreadings#recommended_books'
  get '/users/:user_id/current', to: 'soloreadings#current_books'
  get '/users/:user_id/favorite', to: 'soloreadings#favorite_books'
  get '/users/:user_id/queue', to: 'soloreadings#queue_books'
  get '/users/:user_id/history', to: 'soloreadings#history_books'

  get '/users/:user_id/books/:book_id/add_to_current', to: 'books#add_to_current'
  get '/users/:user_id/books/:book_id/add_to_favorites', to: 'books#add_to_favorites'
  get '/users/:user_id/books/:book_id/mark_complete', to: 'books#mark_complete'

  resources :books, only: [] do
    resources :chapters , only: [:show]
    resources :reviews , only: [:index, :create, :show]
  end

  resources :chapters, only: [] do
    resources :reactions , only: [:create, :show]
  end

  resources :reactions, only: [] do
    resources :comments , only: [:create]
  end

  post '/register', to: 'users#create'
  post '/login', to: 'sessions#login'
  get '/logout', to: 'sessions#logout'


end
