class AccessController < ApplicationController

  before_action :confirm_login, except: [:login, :attempt_login,:logout]
  def menu
    # display text and links
  end

  def login

  end

  def attempt_login
    if params[:name].present? && params[:password].present?
      found_user = User.where(name: params[:name]).first
      if found_user
        authorized_user = found_user.authenticate(params[:password])
      end
    end
    if authorized_user
      session[:user_id] = authorized_user.id
      flash[:notice] = "you are logged in."
      redirect_to(pokemons_path)
    else
      flash.now[:notice] = "invalid user"
      render("login")
    end
  end

  def logout
    session[:user_id] = nil
    flash[:notice] = "you are logged out."
    redirect_to(access_login_path)
  end

end
