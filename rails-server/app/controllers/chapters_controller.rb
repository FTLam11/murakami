class ChaptersController < ApplicationController

  def show
    chapter = Chapter.find(params[:id])
    reactions = chapter.reactions
    render json: { chapter: chapter, reactions: reactions }
  end

end
