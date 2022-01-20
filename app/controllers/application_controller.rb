class ApplicationController < ActionController::Base
  #uncomment to add the login
  #before_action :confirm_login, except: [:login, :attempt_login,:logout]

  private
  def confirm_login
    unless session[:id]
      flash[:notice] = "please login"
      redirect_to access_login_path
    end
  end
end
