class SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:username].downcase)
    if user && user.authenticate(params[:hashword])
      session[:user_id] = user.id
      #What does the rails controller do?
    else
      render json: { errors: user.errors.full_messages }
    end
  end

  def destroy
    session.clear
    current_user = nil
  end


end
