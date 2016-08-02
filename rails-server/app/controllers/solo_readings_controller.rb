class SoloReadingsController < ApplicationController
  include ApplicationHelper

  def recommended_books
    rec_criteria = SoloReading.recommendations(params[:user_id])[:author].sample
    render json: { recommendations: rec_criteria }
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
    render json: { queue_books: queue_books }
  end

  def history_books
    history_books = SoloReading.book_lists(params[:user_id], "history")
    render json: { history_books: history_books }
  end

  def trending_books
    popular_books = SoloReading.trending("current")[0..8]
    favorite_books = SoloReading.trending("favorite")[0..8]
    render json: { popular_books: popular_books, favorite_books: favorite_books }
  end

end
