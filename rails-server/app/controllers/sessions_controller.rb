class SessionsController < ApplicationController

  def login
    user = User.find_by(username: params[:username].downcase)
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { session: session }
    else
      render json: { errors: user.errors.full_messages }
    end
  end

  def logout
    session.clear
    current_user = nil
  end

end
