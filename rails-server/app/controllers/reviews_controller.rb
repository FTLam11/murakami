class ReviewsController < ApplicationController
  def index
    reviews = Review.where(book_id: params[:book_id])
    render json: { reviews: reviews}
  end

  def create
    if !Book.find(params['book_id'])
      message = "Please add this book to your list in order to review it."
    else
      review = Reviews.create(chapter_id: params['chapter_id'], content: params['content'], user_id: params['user_id'], rating: params['rating'])
    end
    render json: { review: review, message: message }
  end

  def show
    review = Reviews.find(params[:id])
    render json: { review: review}
  end

  private

  # def review_params
  #   params.require(:review).print(:user_id,:book_id,:content,:rating)
  # end

end
