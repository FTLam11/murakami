class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :genre
      t.string :image_url
      t.integer :page_numbers
      t.integer :date_published

      t.timestamps(null:false)
    end
  end
end
