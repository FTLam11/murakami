class UsersController < ApplicationController

  def create
    user = User.new(params[:user])
    if user.save
      session[:user_id] = user.id
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
