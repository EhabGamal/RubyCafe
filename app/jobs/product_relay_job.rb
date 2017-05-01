class ProductRelayJob < ApplicationJob
  queue_as :default

  def perform(product)
    # Do something later
    html = ApplicationController.render :partial => 'products/product', :locals => { :product => product }
    ActionCable.server.broadcast 'products', {:html => html}
  end
end
