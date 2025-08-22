class ApplicationController < ActionController::API
  respond_to :json

  private

  def authenticate_user!
    auth = request.headers['Authorization'].to_s
    token = auth.start_with?('Bearer ') ? auth.split(' ', 2).last : nil
    unless token
      render json: { error: 'Unauthorized' }, status: :unauthorized and return
    end

    begin
      payload, = JWT.decode(
        token,
        ENV.fetch('DEVISE_JWT_SECRET', 'changeme-please'),
        true      
      )
      @current_user = User.find(payload['sub'])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: 'Unauthorized' }, status: :unauthorized and return
    end
  end

  def current_user
    @current_user
  end
end
