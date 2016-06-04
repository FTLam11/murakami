class CreateReactions < ActiveRecord::Migration
  def change
    create_table :reactions do |t|
      t.integer :chapter_id
      t.string :content
      t.integer :user_id
      t.timestamps(null:false)
    end
  end
end
