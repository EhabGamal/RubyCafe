# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

category = Category.create(name:'test',description:'test category')
100.times do |p|
  Product.create(
      :name =>Faker::Commerce.product_name,
      :description => Faker::Lorem.paragraph(sentence_count = 3),
      :category_id => category.id,
      :price => Faker::Commerce.price,
      :available => TRUE
  )
end