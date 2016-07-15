class Comment < ActiveRecord::Base
  belongs_to :reaction
  belongs_to :user

  validates :reaction_id, :content, :user_id, presence: true

  def self.index_comments(comments)
  	all_comments = []
		comments.each do |comment|
      all_comments << {comment: comment, username: comment.user.user_name}
    end
  end 

end
