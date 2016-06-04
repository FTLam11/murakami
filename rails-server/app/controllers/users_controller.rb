class UsersController < ApplicationController

  def index
  end

  def new
    @user = User.new()
  end

  def create
    print params[:user]
    @user = User.create(email: params[:user]["email"], user_name: params[:user]["username"], hashword: params[:user]["password"])
    if @user.save
      session[:user_id] = @user.id
    end
    render json: {msg: "hello world"}.to_json
  end

  def edit
  end

  def show
  end


  # def user_params
  #   params.require(:user).print(:username, :email, :password)
  # end

end
