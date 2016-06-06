class ReactionsController < ApplicationController

  def create
    reaction = current_user.reactions.create(reaction_params)
  end

  def index
    reactions = Reaction.all.select {|reaction| reaction.chapter_id == 1}
    render json: { reactions: reactions }
  end

  def show
    reaction = Reaction.find(params[:id])
    comments = reaction.comments
    render json: { reaction: reaction, comments: comments }
  end

  private

  def reaction_params
    params.require(:reaction).print(:chapter_id, :content, :user_id)
  end

end
