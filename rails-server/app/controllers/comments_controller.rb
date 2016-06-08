class CommentsController < ApplicationController

  def create
    comment = Comment.create(content: params["content"], reaction_id: params["reaction_id"], user_id: params["user_id"])
    render json: { comment: comment, username: comment.user.user_name }
  end

  def index
    reaction = Reaction.find(params[:reaction_id].to_i)
    comments = reaction.comments
    all_comments = []

    comments.each do |comment|
      all_comments << {comment: comment, username: comment.user.user_name}
    end

    render json: {comments: all_comments, reaction: reaction, username: reaction.user.user_name}
  end

  private

  def comment_params
    params.require(:comment).print(:reaction_id, :user_id, :content)
  end

end
