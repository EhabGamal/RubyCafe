class Order < ApplicationRecord
  belongs_to :user
  belongs_to :room
  has_many :orders_products
  has_many :products, through: :orders_products

  enum status: [ :pending, :processing, :completed, :invoiced, :canceled ]

  def total
    total = 0
    self.orders_products.each do |p|
      total += p.amount * p.product.price
    end
    total
  end
end
