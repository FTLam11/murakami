class Reaction < ActiveRecord::Base
  belongs_to :chapter
  belongs_to :user
  has_many :comments

  validates :chapter_id, :content, :user_id, presence: true


  def self.check_reactions(reactions)
  	current_reactions = []
  	reactions.each do |reaction|
      if reaction.chapter_id == chapter_int
        current_reactions << {reaction: reaction.content, reaction_id: reaction.id,  username: reaction.user.user_name, userAvatar: reaction.user.image_url}
      end
    end  
  end 

end
