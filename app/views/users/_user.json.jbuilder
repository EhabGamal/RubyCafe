json.extract! user, :id, :name, :email, :password, :room_id, :ext, :created_at, :updated_at
json.url user_url(user, format: :json)
