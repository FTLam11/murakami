class ReviewsController < ApplicationController
  def index
    reviews = Review.where(book_id: params[:book_id])
    reviews_users = []

    reviews.each do |review|
        reviews_users << {review: review, user: review.reviewer.user_name}
    end

    render json: { reviews: reviews_users }
  end

  def create
    review = Review.create(content: params['content'], user_id: params['user_id'], rating: params['rating'], book_id: params['book_id'], book_title: params['book_title'])
    render json: { review: review, user: review.reviewer.user_name }
  end

  def show
    review = Review.find(params[:id])
    render json: { review: review}
  end

  private

  def review_params
    params.require(:review).print(:user_id,:book_id,:content,:rating)
  end

end
