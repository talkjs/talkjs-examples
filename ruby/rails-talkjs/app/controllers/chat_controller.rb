class ChatController < ApplicationController
  def index
    @users = User.all
    gon.users = @users
  end

  def conversation
    @users = User.all
    gon.mainUser = User.find_by(id: 'john.garcia')
    gon.users = @users
  end
end