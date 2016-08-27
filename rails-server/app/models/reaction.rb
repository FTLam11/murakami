class Reaction < ActiveRecord::Base
  belongs_to :chapter
  belongs_to :user
  has_many :comments

  validates :chapter_id, :content, :user_id, presence: true

  def self.get_reaction_details(chapter_id)
    Reaction.where(chapter_id: chapter_id).map { |reaction| reaction = {reaction: reaction.content, reaction_id: reaction.id,  username: reaction.user.user_name, userAvatar: reaction.user.image_url} }
  end 
end
