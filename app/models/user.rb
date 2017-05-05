class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_attached_file :avatar, :storage => :cloudinary, :cloudinary_credentials => Rails.root.join("config/cloudinary.yml"), :path => ':id/:style/:filename', :styles => {medium: "300x300>", thumb: "100x100>"},default_url: "http://res.cloudinary.com/deyhmlb47/image/upload/missing.png"
  validates_attachment :avatar, content_type: {content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"]}

  belongs_to :room
end
