class CreateSoloReadings < ActiveRecord::Migration
  def change
    create_table :solo_readings do |t|
      t.integer :user_id
      t.integer :book_id
      t.boolean :favorite, default: false
      t.boolean :complete, default: false
      t.boolean :queue, default: false
      t.boolean :current, default: false
      t.timestamps(null:false)
    end
  end
end
