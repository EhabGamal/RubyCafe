json.extract! order, :id, :status, :note, :user_id, :room_id, :product_id, :created_at, :updated_at
json.url order_url(order, format: :json)
