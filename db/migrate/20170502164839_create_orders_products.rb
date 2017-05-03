class CreateOrdersProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :orders_products do |t|
      t.integer :amount
      t.references :order, foreign_key: true
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end
