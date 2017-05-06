class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  def index
    if user_signed_in?
      if current_user.isadmin
        redirect_to(orders_path)
      else
        redirect_to(new_order_url)
      end

    else
      render 'pages/index'
    end


  end

end
