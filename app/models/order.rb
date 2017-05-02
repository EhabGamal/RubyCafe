class Order < ApplicationRecord
  belongs_to :user
  belongs_to :room
  belongs_to :product
end
