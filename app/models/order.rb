class Order < ApplicationRecord
  belongs_to :user
  belongs_to :room
  has_many :order_products
  has_many :products, through: :orders_products

  enum status: [ :pending, :processing, :completed, :invoiced, :canceled ]
end
