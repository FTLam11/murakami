module ApplicationHelper
  def current_user
    @current_user ||= User.find(session["user_id"])
  end

  def logged_in?
    return true if session[:user_id] != nil
  end

  def get_user
    user = User.find(params["user_id"])
  end

  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to login_path # halts request cycle
    end
  end
end
