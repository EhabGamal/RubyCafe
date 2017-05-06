json.extract! order, :id, :status, :note, :user_id, :room_id, :product_ids, :created_at, :updated_at
json.url order_url(order, format: :json)
