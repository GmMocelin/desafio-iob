class Api::V1::CountriesController < ApplicationController
   before_action :authenticate_user!

  def index
    render json: Country.order(:name)
  end

  def show
    country = Country.find_by!(code: params[:code].to_s.upcase)
    render json: country
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Country not found" }, status: :not_found
  end
end
