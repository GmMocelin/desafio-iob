class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user!, raise: false

  def create
    email = params.dig(:user, :email).to_s
    password = params.dig(:user, :password).to_s

    user = User.find_for_database_authentication(email: email)
    unless user&.valid_password?(password)
      return render json: { error: "Invalid email or password" }, status: :unauthorized
    end

    # Importante: sem sessão em API-only
    sign_in(:user, user, store: false)

    # 1) tenta pegar o token gerado pelo devise-jwt
    token = request.env["warden-jwt_auth.token"]

    # 2) se por algum motivo não veio, gera manualmente com o mesmo encoder
    if token.blank?
      token, _payload = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
    end

    # coloca no header (para o front ler res.headers['authorization'])
    response.set_header("Authorization", "Bearer #{token}")

    # e no body também (fallback)
    render json: {
      user: { id: user.id, name: user.name, email: user.email },
      token: token
    }, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end
end
