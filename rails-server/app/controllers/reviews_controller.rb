class ReviewsController < ApplicationController
  def index
    @reviews = Review.where(book_id: params[:book_id])
  end

  def create
    @review = Review.create(user_id: )
  end

end
