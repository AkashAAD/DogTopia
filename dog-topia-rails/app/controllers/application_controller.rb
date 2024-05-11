class ApplicationController < ActionController::API
  attr_reader :current_user

  def not_found
    render json: { error: 'not_found' }
  end

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user ||= User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: 'Please login with user' }
    rescue JWT::DecodeError => e
      render json: { error: 'Please login with user' }
    end
  end
end
