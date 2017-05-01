class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.float :price
      t.references :category, foreign_key: true
      t.boolean :available
      t.text :description

      t.timestamps
    end
  end
end
