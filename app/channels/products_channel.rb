class ProductsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'products'
    # stream_from "products:#{current_user.id}"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
