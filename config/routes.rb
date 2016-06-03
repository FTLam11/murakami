Rails.application.routes.draw do
  resources :users do #index, new, edit, show
    resources :books #new, edit, show?, update
  end

  get '/books/search', to: 'books#search'

  root to: "user#home"
end
