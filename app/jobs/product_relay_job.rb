class ProductRelayJob < ApplicationJob
  queue_as :default

  def perform(product,action)
    # Do something later
    ActionCable.server.broadcast 'products', {:product => product.as_json,:action=>action}
  end
end
