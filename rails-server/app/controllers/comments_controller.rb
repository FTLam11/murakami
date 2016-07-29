class CommentsController < ApplicationController

  def create
    comment = Comment.create(comment_params)

    render json: { comment: comment, username: comment.user.user_name }
  end

  def index
    reaction = Reaction.find(params[:reaction_id].to_i)#.includes(:)

    render json: { comments: Comment.get_comment_author(reaction.comments), reaction: reaction, username: reaction.user.user_name }
  end

  private

  def comment_params
    params.require(:comment).permit(:reaction_id, :user_id, :content)
  end

end
