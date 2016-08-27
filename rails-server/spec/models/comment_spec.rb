require 'rails_helper'
require 'rspec_helpers'

describe Comment do
  include Helpers

  describe "Comment::get_comment_author" do
    before(:each) do
      user = create_user_helper
      user2 = create_user_helper("Lom")
      reaction = user.reactions.create!(chapter_id: 1, content: "WOW")
      reaction.comments.create!(content: "hello", user_id: user.id)
      reaction.comments.create!(content: "world", user_id: user2.id)
    end
    
    context "when a reaction has a single comment" do
      it "returns the comment and the comment's author" do
        comments_by_author = Comment.get_comment_author(Comment.last)
        expect(comments_by_author.first[:comment]).to be_instance_of(Comment)
        expect(comments_by_author.first[:username]).to eq("Lom")
      end
    end

    context "when a reaction has multiple comments" do
      it "returns each comment and each comment's author" do
        comments_by_author = Comment.get_comment_author(Comment.last(2))
        expect(comments_by_author.first[:comment]).to be_instance_of(Comment)
        expect(comments_by_author.last[:comment]).to be_instance_of(Comment)
        expect(comments_by_author.first[:username]).to eq("Fronk")
        expect(comments_by_author.last[:username]).to eq("Lom")
      end
    end
  end
end