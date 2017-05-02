class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.integer :status
      t.text :note
      t.references :user, foreign_key: true
      t.references :room, foreign_key: true
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end
