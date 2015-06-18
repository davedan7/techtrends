class UsersController < ApplicationController
  
  def show
    @user = User.find_by(params[:user_id])
  end
end