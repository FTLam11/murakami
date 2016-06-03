class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :name
      t.string :author
      t.string :genre
      t.integer :page_numbers
      t.integer :date_published
      t.string :publisher
      t.timestamps(null:false)
    end
  end
end
