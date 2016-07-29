class Comment < ActiveRecord::Base
  belongs_to :reaction
  belongs_to :user

  validates :reaction_id, :content, :user_id, presence: true

  def self.get_comment_author(comments)
    # p comments
    [*comments].map do |comment|
      comment = {comment: comment, username: comment.user.user_name}
    end
  end

  def test(comments)
    [*comments].map do |comment|
      comment = {comment: comment, username: comment.user.user_name}
    end
  end 

end
