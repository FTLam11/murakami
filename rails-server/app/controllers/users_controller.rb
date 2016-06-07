class UsersController < ApplicationController
  def index
  end

  def create
    user = User.new(email: params["email"], user_name: params["username"], password: params["password"], image_url: "image_url")
    p user
    if user.save
      session[:user_id] = user.id
      render json: {token: user.id, error_messages: []}, status: :ok
    else
      render json: { error_messages: user.errors.full_messages }
    end
  end

  def show
    user = User.find(params[:id])
    render json: {username: user.user_name, image: user.image_url}
  end

  def reviews
    user = User.find(params[:user_id])
    reviews = user.reviews
    p reviews
    render json: {reviews: reviews}
  end

  private

  def user_params
    params.require(:user).permit(:user_name, :email, :password)
  end

end
