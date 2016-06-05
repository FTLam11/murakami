class Reaction < ActiveRecord::Base
  belongs_to :chapter
  belongs_to :user
  has_many :comments

  validates :chapter_id, :content, :user_id, presence: true
end
