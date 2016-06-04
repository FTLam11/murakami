class UsersController < ApplicationController
  def recommended_books
    rec_criteria = recommendations(current_user.id)
    rec_books = retrieve_rec_books(rec_criteria)
  end


    current_books = book_lists(current_user.id, "current")
    favorite_books = book_lists(current_user.id, "favorite")
    queue_books = book_lists(current_user.id, "queue")

    render json: {rec_books: rec_books, current_books: current_books, favorite_books: favorite_books, queue_books: queue_books}
  end
end
