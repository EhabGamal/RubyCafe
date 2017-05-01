json.extract! room, :id, :name, :address, :created_at, :updated_at
json.url room_url(room, format: :json)
