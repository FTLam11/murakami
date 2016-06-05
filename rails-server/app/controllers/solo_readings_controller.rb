class SoloReadingsController < ApplicationController
  include ApplicationHelper


  def recommended_books
    rec_criteria = recommendations(params[:user_id])
    rec_books = retrieve_rec_books(rec_criteria)
    render json: { recommendations: rec_books }
  end

  def current_books
    current_books = SoloReading.book_lists(params[:user_id], "current")
    render json: { current_books: current_books }
  end

  def favorite_books
    favorite_books = SoloReading.book_lists(params[:user_id], "favorite")
    render json: { favorite_books: favorite_books }
  end

  def queue_books
    queue_books = SoloReading.book_lists(params[:user_id], "queue")
    p queue_books
    render json: { queue_books: queue_books }
  end

  def history_books
    history_books = SoloReading.book_lists(params[:user_id], "history")
    render json: { history_books: history_books }
  end

  def trending_books
  end

end
