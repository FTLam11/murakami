class CommentsController < ApplicationController

  def create
    comment = Comment.create(comment_params)
  end


  private

  def comment_params
    params.require(:comment).print(:reaction_id,:user_id,:content)
  end

end
