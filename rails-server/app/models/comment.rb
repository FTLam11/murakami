class Comment < ActiveRecord::Base
  belongs_to :reaction
  belongs_to :user

  validates :reaction_id, :content, :user_id, presence: true
end
