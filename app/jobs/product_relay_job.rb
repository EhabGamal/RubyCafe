class ProductRelayJob < ApplicationJob
  queue_as :default

  def perform(product,action)
    # Do something later
    html = ApplicationController.render :partial => 'products/product', :locals => { :product => product }
    ActionCable.server.broadcast 'products-admin', {:html => html,:object => product.as_json,:action=>action}
    if current_user.isadmin==1
      html = ApplicationController.render :partial => 'products/product_admin', :locals => { :product => product }
      ActionCable.server.broadcast 'products-admin', {:html => html,:object => product.as_json,:action=>action}
    end
  end
end
