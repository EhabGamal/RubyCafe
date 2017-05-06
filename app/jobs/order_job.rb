class OrderJob < ApplicationJob
  queue_as :default

  def perform(order, action)
    # if current_user.isadmin
    if True
      ActionCable.server.broadcast 'orders', {:order => order.as_json,:action=>action}
    else
      ActionCable.server.broadcast "orders:#{current_user.id}", {:order => order.as_json,:action=>action}
    end
  end
end
