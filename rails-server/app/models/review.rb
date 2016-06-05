class Review < ActiveRecord::Base
  belongs_to :reviewer, class_name: "User"
  belongs_to :book

  validates :user_id, :book_id, :content, :rating, presence: true
end
