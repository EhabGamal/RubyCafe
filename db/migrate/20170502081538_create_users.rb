class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.references :room, foreign_key: true
      t.string :ext
      t.timestamps
    end
  end
end
