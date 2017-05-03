class PagesController < ApplicationController
  def index

  end

  def products
    respond_to do |format|
      format.json { render json: Product.all }
    end
  end

end
