class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  # semantic_breadcrumb "Home", :root_path
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:room_id,:ext,:avatar])
  end
end
