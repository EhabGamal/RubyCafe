class Order < ApplicationRecord
  belongs_to :user
  belongs_to :room
  has_many :orders_products
  has_many :products, through: :orders_products

  enum status: [ :pending, :processing, :completed, :invoiced, :canceled ]

  def total
    total = 0
    self.orders_products.each do |p|
      total += p.amount.to_f * p.product.price.to_f
    end
    total
  end
end
