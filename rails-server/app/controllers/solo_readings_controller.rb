class SoloReadingsController < ApplicationController
  include ApplicationHelper

  def recommended_books
    rec_criteria = SoloReading.recommendations(params[:user_id])[:author].sample
    render json: { recommendations: rec_criteria }
  end

  def current_books
    current_books = SoloReading.book_lists(params[:user_id], "current")
    # first_chatper = current_books.each do |book|
    #    << book.chapters.first
    # end
    render json: { current_books: current_books }
  end

  def favorite_books
    p params
    p "----------------------------------------"
    favorite_books = SoloReading.book_lists(params[:user_id], "favorite")
    p favorite_books
    p "----------------------------------------"
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
    popular_books = SoloReading.trending_now("current")[0..8]
    favorite_books = SoloReading.trending_now("favorite")[0..8]
    render json: { popular_books: popular_books, favorite_books: favorite_books }
  end

end
