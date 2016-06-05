class SoloReadingsController < ApplicationController

  def recommended_books
      rec_criteria = recommendations(params[:user_id])
      rec_books = retrieve_rec_books(rec_criteria)
  end

  def current_books
    current_books = book_lists(params[:user_id], "current")
    render json: {current_books: current_books}
  end

  def favorite_books
    current_books = book_lists(params[:user_id], "favorite")
    render json: {current_books: current_books}
  end

  def queue_books
    current_books = book_lists(params[:user_id], "queue")
    render json: {current_books: current_books}
  end

  def history_books
    current_books = book_lists(params[:user_id], "history")
    render json: {current_books: current_books}
  end

end
