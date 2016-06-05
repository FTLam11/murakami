class ReactionsController < ApplicationController

  def index
    reactions = Chapter.find(params[:chapter_id]).reactions
    render json: { reactions: reactions }
  end

  def create
    reaction = Reaction.create(reaction_params)


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
