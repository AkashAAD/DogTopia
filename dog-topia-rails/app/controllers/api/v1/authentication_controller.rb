module Api
  module V1
    class AuthenticationController < ApplicationController
      before_action :authorize_request, except: :login

      def login
        @user = User.find_by_email(params[:email])
        if @user&.authenticate(params[:password])
          token = JsonWebToken.encode({user_id: @user.id, email: @user.email})
          time = Time.now + 24.hours.to_i
          render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                         email: @user.email }, status: :ok
        else
          render json: { error: 'Invalid Username or Password' }
        end
      end

      private

      def login_params
        params.permit(:email, :password)
      end
    end
  end
end
