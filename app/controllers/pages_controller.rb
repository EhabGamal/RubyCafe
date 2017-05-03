class PagesController < ApplicationController
  def index

  end

  def products
    @products = Product.all.select("id, name, price,available,category_id,description")
    render json: {:success=>true, :message=>"List of all products",:ads=>@products.map {|u| u.attributes.merge(:image_url => u.image.url)}}, :status=>200
  end

end
