class SessionsController < ApplicationController

  def login
    p params
    user = User.find_by(user_name: params["username"].downcase)
    if user && user.authenticate(params["password"])
      session[:user_id] = user.id
      p "+++++++++++++++++++++++++++++++++++++++++++++"
      p session
      @current_user = User.find(session[:user_id])
      render json: {token: user.id}, status: :ok
    else
      render json: { token: "failed" }
    end
  end

  def logout
    session.clear
    current_user = nil
  end

end
