class UsersController < ApplicationController
  def index
  end

  def create
    user = User.new(email: params["email"], user_name: params["username"], hashword: params['password'], image_url: "image_url")
    if user.save
      session[:user_id] = user.id
      render json: {token: user.hashword}, status: :ok
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
