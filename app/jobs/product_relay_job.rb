class ProductRelayJob < ApplicationJob
  queue_as :default

  def perform(product,action)
    # Do something later
    html = ApplicationController.render :partial => 'products/product', :locals => { :product => product }
    ActionCable.server.broadcast 'products', {:html => html,:object => product,:action=>action}
  end
end
