class CreateSoloReadings < ActiveRecord::Migration
  def change
    create_table :solo_readings do |t|
      t.integer :user_id
      t.integer :book_id
      t.boolean :favorite?
      t.boolean :complete?
      t.boolean :queue?
      t.boolean :current?
      t.timestamps(null:false)
    end
  end
end
