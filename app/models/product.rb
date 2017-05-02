class Product < ApplicationRecord
  belongs_to :category
  has_many :orders_products
  has_many :orders, through: :order_products
  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment :image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] }
  after_commit -> { ProductRelayJob.perform_later(self) }

  validates :name, :price, :category_id, presence: true
  validates :name, uniqueness: true
end
