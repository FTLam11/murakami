class ReviewsController < ApplicationController
  def index
    reviews = Review.where(book_id: params[:book_id])
    render json: { reviews: reviews}
  end

  def create
    review = Reviews.create(review_params)
    render json: { review: review}
  end

  def show
    review = Reviews.find(params[:id])
    render json: { review: review}
  end

  private

  def review_params
    params.require(:review).print(:user_id,:book_id,:content,:rating)
  end

end
