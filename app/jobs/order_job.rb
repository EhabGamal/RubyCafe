class OrderJob < ApplicationJob
  queue_as :default

  def perform(order, action)
    ActionCable.server.broadcast 'orders', {:order => order.as_json,:action=>action}
  end
end
