class SessionsController < ApplicationController

  def login
    p params
    user = User.find_by(user_name: params["username"].downcase)
    if user && user.authenticate(params["password"])
      session[:user_id] = user.id
      render json: { token: user.id }, status: :ok
    else
      render json: { token: "failed" }
    end
  end

  def logout
    session.clear
  end

end
