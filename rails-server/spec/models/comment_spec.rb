require 'rails_helper'

describe Comment do
  describe "Comment::get_comment_author" do
    let (:user) { User.create(user_name: "Fronk",  email: "Fronk@fronk.fronk", password_digest: "fronk", image_url: "test") }
    let (:reaction) { Reaction.create(chapter_id: 1, content: "WOW", user_id: 1) }
    let (:comment) { Comment.create(reaction_id: 1, user_id: 1, content: "HOLY") }
    let (:comment2) { Comment.create(reaction_id: 1, user_id: 1, content: "YO") }

    context "when a reaction has a single comment" do
      it "returns the comment and the comment's author" do
        p Comment.last
        comments_by_author = Comment.get_comment_author(Comment.last)
        expect(comments_by_author.first[:comment]).to be_instance_of(Comment)
        expect(comments_by_author.first[:username]).to eq(user.user_name)
      end
    end

    context "when a reaction has multiple comments" do
      it "returns each comment and each comment's author" do
        comments_by_author = Comment.get_comment_author(user.comments)
        expect(comments_by_author.first[:comment]).to be_instance_of(Comment)
        expect(comments_by_author.first[:username]).to eq(user.user_name)
      end
    end
  end
end