class SessionsController < ApplicationController

  def login
    print params[:username]
    user = User.find_by(user_name: params[:username].downcase)
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
