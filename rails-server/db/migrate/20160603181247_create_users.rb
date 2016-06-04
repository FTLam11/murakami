class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :email
      t.string :hashword
      t.string :image_url
      t.timestamps(null:false)
    end
  end
end
