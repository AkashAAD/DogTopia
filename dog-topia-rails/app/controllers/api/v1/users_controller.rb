module Api
  module V1
    class UsersController < ApplicationController
      before_action :authorize_request, except: :create

      def create
        @user = User.new(user_params)

        if @user.save
          render json: @user, status: :created
        else
          render json: { error: @user.errors.full_messages.join(', ') }
        end
      end

      private

      def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
      end
    end
  end
end
