class CreateGroupReadings < ActiveRecord::Migration
  def change
    create_table :group_readings do |t|
      t.integer :group_id
      t.integer :book_id
      t.boolean :favorite?
      t.boolean :complete?
      t.boolean :queue?
      t.boolean :current?
      t.timestamps(null:false)
    end
  end
end
