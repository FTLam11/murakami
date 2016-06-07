class SoloReadingsController < ApplicationController
  include ApplicationHelper

  def recommended_books
    rec_criteria = SoloReading.recommendations(params[:user_id])
    rec_books = SoloReading.retrieve_rec_books(rec_criteria,params[:user_id])
    render json: { recommendations: rec_books }
  end

  def current_books
    current_books = SoloReading.book_lists(params[:user_id], "current")
    first_chatper = current_books.each do |book|
      << book.chapters.first
    p current_books
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
    trending_books = SoloReading.trending_now
    render json: { trending_books: trending_books }
  end

end
