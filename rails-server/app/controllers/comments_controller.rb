class CommentsController < ApplicationController

  def index
    @comments = Reaction.find_by(:params[reaction_id]).comments
    #pass to the client for them to show
  end

  # def show
  #   @comment = Comment.find(reaction_id)
  #   @comments = @Comment.comments
  # end

end
