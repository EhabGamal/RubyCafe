class Product < ApplicationRecord
  belongs_to :category
  has_many :orders_products
  has_many :orders, through: :order_products
  # has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  has_attached_file :image, :storage => :cloudinary, :cloudinary_credentials => Rails.root.join("config/cloudinary.yml"), :path => ':id/:style/:filename', :styles => {medium: "300x300>", thumb: "100x100>"}, default_url: "http://res.cloudinary.com/deyhmlb47/image/upload/missing.png"
  validates_attachment :image, content_type: {content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"]}
  # after_commit -> {ProductRelayJob.perform_later(self, "create")}, on: :create
  # after_commit -> {ProductRelayJob.perform_later(self, "update")}, on: :update
  # before_destroy -> {ProductRelayJob.perform_later(self, "destroy")}
  validates :name, :price, :category_id, presence: true
  validates :name, uniqueness: true

  def image_url
    self.image.url
  end
end
