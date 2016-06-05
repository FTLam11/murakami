class UsersController < ApplicationController
  def index
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: {token: user.password}, status: :ok
    else
      render json: { error_messages: user.errors.full_messages }
    end
  end

  def show
    user = User.find(params[:user_id])
    render json: {username: user.user_name, image: user.image_url}
  end

  private

  def user_params
    params.require(:user).print(:username, :email, :password)
  end

end
