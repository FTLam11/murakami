Rails.application.routes.draw do
  resources :users do #index, new, edit, show
    resources :books #new, edit, show?, update
  end

  resources :books do
    resources :chapters , only: [:create, :show]
  end

  # books/:book_id/chapters/:chapter_id/

  # reactions/:reaction_id/comments/:comment_id

  get '/books/search', to: 'books#search'

  root to: "user#home"
end
